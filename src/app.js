const express = require('express');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const routes = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));



// logs
const logStream = fs.createWriteStream('logs.txt', { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));

// Routeur
app.use(routes);

module.exports = app;
