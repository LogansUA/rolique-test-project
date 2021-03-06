const httpStatus = require('http-status');
const express = require('express');
const ObjectId = require('mongodb').ObjectId;

module.exports = (app, options) => {
    const router = express.Router();
    const { database: db } = options;

    const usersCollection = db.collection('users');

    router.get('/', async (req, res) => {
        try {
            const users = await usersCollection.find().toArray();

            return res.status(httpStatus.OK).json({ users });
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.toString())
        }
    });

    router.post('/', async (req, res) => {
        try {
            const {
                name,
                email,
            } = req.body;

            await usersCollection.insertOne({ name, email });

            return res.status(httpStatus.CREATED).json();
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.toString())
        }
    });

    router.put('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const {
                name,
                email,
            } = req.body;
            await usersCollection.updateOne({ _id: ObjectId(id) }, { $set: { name, email } });

            return res.status(httpStatus.OK).json();
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.toString());
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            const { id } = req.params;

            const user = await usersCollection.find({ _id: ObjectId(id) }).toArray();

            return res.status(httpStatus.OK).json({ user });
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.toString());
        }
    });

    router.delete('/:id', async (req, res) => {
        try {
            const { id } = req.params;

            await usersCollection.deleteOne({ _id: ObjectId(id) });

            return res.status(httpStatus.OK).json();
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.toString());
        }
    });

    app.use('/users', router);
};
