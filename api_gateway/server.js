const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug')('api-gateway:server');
const Router = require('./routes/router');

const app = express();
const server = app.listen(process.env.PORT, () => {
    debug(`Listening on ${process.env.PORT}`);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

Router(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');

    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    return res.status(err.status || 500).json(err.toString());
});

process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err)
});

process.on('uncaughtRejection', (err, promise) => {
    console.error('Unhandled Rejection', err)
});
