const httpStatus = require('http-status');

module.exports = (app, router, options) => {
    const { database: db } = options;

    const booksCollection = db.collection('books');

    router.get('/', function (req, res) {
        return booksCollection.find().toArray()
            .then((books) => {
                return res.status(httpStatus.OK).json({ books });
            })
            .catch((error) => {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.toString());
            });
    });

    router.post('/', function (req, res) {
        const {
            name,
            author,
            published_at: publishedAt,
        } = req.body;

        return booksCollection.insertOne({ name, author, published_at: publishedAt })
            .then(() => {
                return res.status(httpStatus.CREATED).json();
            })
            .catch((error) => {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.toString());
            });
    });

    app.use('/books', router);
};
