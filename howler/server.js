const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const routes = require('./src/routes');
app.use(routes);

app.listen(PORT, () => console.log(`Live on http://localhost:${PORT}`));
