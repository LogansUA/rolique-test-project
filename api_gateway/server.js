const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status');
const axios = require('axios');
const debug = require('debug')('api-gateway:server');

const app = express();
const server = app.listen(process.env.PORT, () => {
    debug(`Listening on ${process.env.PORT}`);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Check origin header to ensure that request is from the entry point
app.use(function (req, res, next) {
    const knownOrigins = process.env.KNOWN_ORIGINS || [
        'http://localhost',
    ];

    try {
        const origin = req.headers.origin;

        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        if (knownOrigins.indexOf(origin) >= 0) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        next();
    } catch (err) {
        console.error(`Origin error: ${JSON.stringify(knownOrigins)} | ${req.headers.origin} | ${err.toString()}`);

        next(err);
    }
});

app.all('/books*', async (req, res) => {
    try {
        const booksBaseUrl = `${process.env.BOOK_MICROSERVICE_BASE_URL}`;
        const requestUrl = `${booksBaseUrl}${req.originalUrl}`;

        const response = await axios[req.method.toLowerCase()](requestUrl, { data: req.body });

        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.toString());
    }
});
app.all('/users*', async (req, res) => {
    try {
        const usersBaseUrl = `${process.env.USER_MICROSERVICE_BASE_URL}`;
        const requestUrl = `${usersBaseUrl}${req.originalUrl}`;

        const response = await axios[req.method.toLowerCase()](requestUrl, req.body);

        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.toString());
    }
});

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
