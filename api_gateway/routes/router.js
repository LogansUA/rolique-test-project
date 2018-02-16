const httpStatus = require('http-status');
const express = require('express');
const axios = require('axios');

module.exports = (app) => {
    const router = express.Router();
    const bookServiceUrl = `${process.env.BOOK_MICROSERVICE_HOST}:${process.env.BOOK_MICROSERVICE_PORT}`;

    router.get('/', async (req, res) => {
        try {
            const response = await axios.get(`http://${bookServiceUrl}/books`);

            return res.status(httpStatus.OK).json(response.data);
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.toString());
        }
    });

    app.use('/books', router);
};
