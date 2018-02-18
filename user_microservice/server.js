const { EventEmitter } = require('events');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug')('user-microservice:server');
const db = require('./config/db');

const Router = require('./routes/router');

const dbEmitter = new EventEmitter();

db.connect({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
}, dbEmitter);

dbEmitter.on('db:ready', (database) => {
    const app = express();

    const server = app.listen(process.env.PORT, () => {
        debug(`Listening on ${process.env.PORT}`);
    });

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    Router(app, { database });

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

    process.on('uncaughtException', (err) => {
        console.error('Unhandled Exception', err)
    });

    process.on('uncaughtRejection', (err, promise) => {
        console.error('Unhandled Rejection', err)
    });
});

dbEmitter.on('db:error', console.error);
