module.exports = (app, router, options) => {
    /* GET users listing. */
    router.get('/', function (req, res, next) {
        return res.status(200).json({ message: 'book-microservice' });
    });

    app.use('/users', router);
};
