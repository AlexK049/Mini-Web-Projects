const express = require('express');
const routes = express.Router();

const authRouter = require('./authRoutes')
routes.use('/api', authRouter);

const apiRouter = require('./apiRoutes');
routes.use('/api', apiRouter);

const frontendRouter = require('./frontendRoutes');
routes.use(frontendRouter)

module.exports = routes;
