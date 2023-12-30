const express = require('express');
const userDao = require('./userDao')

const authRouter = express.Router();
authRouter.use(express.json());
const { TokenMiddleware, generateToken, removeToken } = require('./middleware/jwt');

authRouter.post('/users/login', (req, res) => {
    if (req.body.username && req.body.password) {
        userDao.getUserByCredentials(req.body.username, req.body.password).then(user => {
            generateToken(req, res, user);
            res.status(200).json({ user: user });
        }).catch(err => {
            res.status(401).json({ error: 'Not authenticated' });
        });
    }
    else {
        res.status(401).json({ error: 'Not authenticated' });
    }
});

authRouter.post('/users/logout', (req, res) => {
    removeToken(req, res);

    res.json({ success: true });
});


authRouter.get('/users/current', TokenMiddleware, (req, res) => {
    res.status(200).json({ user: req.user });
});

module.exports = authRouter;