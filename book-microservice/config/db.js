const debug = require('debug')('book-microservice:server');
const MongoClient = require('mongodb').MongoClient;

const connect = (options, eventEmitter) => {
    const {
        host: host = 'localhost',
        port: port = '27017',
        name: name = 'test',
    } = options;

    const databaseUrl = `mongodb://${host}:${port}/${name}`;

    MongoClient.connect(databaseUrl)
        .then((database) => {
            this.database = database;

            debug('Connection to database "%s" has been established successfully.', name);

            eventEmitter.emit('db:ready', database);
        })
        .catch((error) => {
            eventEmitter.emit('db:error', error);
        });
};

module.exports = { connect };
