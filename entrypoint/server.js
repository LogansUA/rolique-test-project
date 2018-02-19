const express = require('express');
const httpStatus = require('http-status');
const axios = require('axios');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const debug = require('debug')('entrypoint:server');

const app = express();
const server = app.listen(process.env.PORT, () => {
    debug(`Listening on ${process.env.PORT}`);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const UPLOADS_DIR = process.env.SERVER_UPLOADS_DIRECTORY || path.join(__dirname, 'uploads');

// Folders for static files
const IMAGES_DIR = path.join(UPLOADS_DIR, 'images');
const DOCUMENTS_DIR = path.join(UPLOADS_DIR, 'documents');

// Static serving paths
app.use('/images', express.static(IMAGES_DIR));
app.use('/documents', express.static(DOCUMENTS_DIR));

app.all('/api/*', async (req, res) => {
    try {
        const urlParams = req.params;
        const urlPath = path.join.apply(null, Object.values(urlParams));

        const apiGateWayUrl = `${process.env.API_GATEWAY_BASE_URL}`;
        const requestUrl = `${apiGateWayUrl}/${urlPath}`;

        // Query parameters will be sent by url
        const response = await axios[req.method.toLowerCase()](requestUrl, req.body);

        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.toString());
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
    console.error('Unhandled Exception', err.toString())
});

process.on('uncaughtRejection', (err, promise) => {
    console.error('Unhandled Rejection at Promise: ', promise, 'reason: ', err.toString())
});
