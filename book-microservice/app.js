const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');

    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    return res.status(err.status || 500).json(err.toString());
});

module.exports = app;
