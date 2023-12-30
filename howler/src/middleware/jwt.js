const base64url = require('base64url');
const crypto = require('crypto');
require('dotenv').config();

const TOKEN_COOKIE_NAME = "Howler";
const BASE_URL = "/howler";

function TokenMiddleware(req, res, next) {
    // We will look for the token in two places:
    // 1. A cookie in case of a browser
    // 2. The Authorization header in case of a different client
    let token = null;

    if (!req.cookies[TOKEN_COOKIE_NAME]) {
        // No cookie, so let's check Authorization header
        const authHeader = req.get('Authorization');
        if (authHeader && authHeader.startsWith("Bearer ")) {
            // Format should be "Bearer token" but we only need the token
            token = authHeader.split(" ")[1];
        }
    } else { // We do have a cookie with a token
        token = req.cookies[TOKEN_COOKIE_NAME]; // Get session Id from cookie
    }

    //verify token
    if (!token) {
        return res.redirect(`${BASE_URL}/login`);
        // return res.status(401).json({ error: 'Not authenticated' });
    }

    const [encodedHeader, encodedPayload, signature] = token.split('.');

    const calculatedSignature = crypto.createHmac('sha256', process.env.JWT_SECRET_KEY)
        .update(encodedHeader + '.' + encodedPayload)
        .digest('base64');

    if (signature !== calculatedSignature) {
        return res.redirect(`${BASE_URL}/login`);
        //return res.status(401).json({ message: 'Not authenticated' });
    }

    const decodedPayload = JSON.parse(base64url.decode(encodedPayload));
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (decodedPayload.exp && decodedPayload.exp < currentTimestamp) {
        return res.redirect(`${BASE_URL}/login`);
        // return res.status(401).json({ message: 'Token expired' });
    }

    req.user = decodedPayload;
    next();
}


function generateToken(req, res, user) {
    const header = { alg: 'HS256', typ: 'JWT' };

    const { password, salt, ...sanitizedUser } = user;
    const payload = {
        ...sanitizedUser,
        exp: Math.floor(Date.now() / 1000) + (60 * 60) //1hr limit on token
    };

    const encodedHeader = base64url(JSON.stringify(header));
    const encodedPayload = base64url(JSON.stringify(payload));

    const signature = crypto.createHmac('sha256', process.env.JWT_SECRET_KEY)
        .update(encodedHeader + '.' + encodedPayload)
        .digest('base64');

    const token = encodedHeader + '.' + encodedPayload + '.' + signature;

    //send token in cookie to client
    res.cookie(TOKEN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 1000 //cookie and jwt expire at the same time
    });
}

function removeToken(req, res) {
    //send session ID in cookie to client
    res.cookie(TOKEN_COOKIE_NAME, "", {
        httpOnly: true,
        secure: true,
        maxAge: -360000 //A date in the past
    });
}

module.exports = { generateToken, removeToken, TokenMiddleware }
