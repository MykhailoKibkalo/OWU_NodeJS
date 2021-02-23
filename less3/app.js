const express = require('express');
const path = require('path');
const apiRouter = require('./router/api.router');


const app = express();

app.use('/', apiRouter);