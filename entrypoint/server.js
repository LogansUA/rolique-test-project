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

app.use('/images/avatar', express.static(IMAGES_DIR));
app.use('/documents', express.static(DOCUMENTS_DIR));

const apiGateWayUrl = `${process.env.API_GATEWAY_BASE_URL}`;

app.get('*', async (req, res) => {
    try {
        const requestUrl = `${apiGateWayUrl}${req.originalUrl}`;

        const request = await axios.get(requestUrl);

        return res.status(httpStatus.OK).json(request.body);
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
    console.error('Unhandled Exception', err)
});

process.on('uncaughtRejection', (err, promise) => {
    console.error('Unhandled Rejection', err)
});
