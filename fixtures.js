#!/usr/bin/env node
const fixtures = require('pow-mongodb-fixtures');
const ObjectId = fixtures.createObjectId;

const books = [
    {
        _id: ObjectId(),
        name: 'La Bocina Esgrimista',
        author: 'Prudencio Zayas Barrera',
        published_at: 1991,
    },
    {
        _id: ObjectId(),
        name: 'La Zapatería Músico',
        author: 'Licurgo Villasenor Navarro',
        published_at: 2010,
    },
    {
        _id: ObjectId(),
        name: 'La Cola Esgrimista',
        author: 'Mentor Carrera Barrientos',
        published_at: 1963,
    },
];

const bookDb = fixtures.connect('db_books', {
    host: 'localhost',
    port: 27017,
});

bookDb.clearAndLoad({ books }, (err) => {
    if (err) {
        console.error(err);
    }

    bookDb.close((err) => {
        if (err) {
            console.error(err);
        }
    });
});

const users = [
    {
        _id: ObjectId(),
        name: 'Soham Stephens',
        email: 'soham.stephens45@example.com',
    },
    {
        _id: ObjectId(),
        name: 'Jesse Hale',
        email: 'jesse.hale40@example.com',
    },
    {
        _id: ObjectId(),
        name: 'Allan Smith',
        email: 'allan.smith59@example.com',
    },
];

const usersDb = fixtures.connect('db_users', {
    host: 'localhost',
    port: 27018,
});

usersDb.clearAndLoad({ users }, (err) => {
    if (err) {
        console.error(err);
    }

    usersDb.close((err) => {
        if (err) {
            console.error(err);
        }
    });
});
