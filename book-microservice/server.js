const http = require('http');
const { EventEmitter } = require('events');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug')('book-microservice:server');
const db = require('./config/db');

const Router = require('./routes/router');

/**
 * Listen on provided port, on all network interfaces.
 */
const dbEmitter = new EventEmitter();

db.connect({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
}, dbEmitter);

dbEmitter.on('db:ready', (database) => {
    const app = express();

    const port = normalizePort(process.env.PORT || '3000');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    Router(app, express.Router(), { database });

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

    const server = http.createServer(app);

    server.listen(port);

    server.on('error', onError);
    server.on('listening', onListening);

    function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : `${addr.address}:${addr.port}`;

        debug('Listening on ' + bind);
    }
});

dbEmitter.on('db:error', onError);

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
