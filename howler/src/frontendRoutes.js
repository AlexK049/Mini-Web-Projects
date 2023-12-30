const express = require('express');
const { TokenMiddleware } = require('./middleware/jwt')

const frontendRouter = express.Router();
frontendRouter.use(express.json());


const path = require('path');
const html_dir = path.join(__dirname, '../templates/')

frontendRouter.get('/', TokenMiddleware, (req, res) => {
    res.sendFile(`${html_dir}index.html`);
});

frontendRouter.get('/login', (req, res) => {
    res.sendFile(`${html_dir}login.html`);
});

module.exports = frontendRouter;
