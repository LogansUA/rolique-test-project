const httpStatus = require('http-status');
const ObjectId = require('mongodb').ObjectId;

module.exports = (app, router, options) => {
    const { database: db } = options;

    const booksCollection = db.collection('books');

    router.get('/', (req, res) => {
        return booksCollection.find().toArray()
            .then((books) => {
                return res.status(httpStatus.OK).json({ books });
            })
            .catch((error) => {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.toString());
            });
    });

    router.post('/', (req, res) => {
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

    router.put('/:id', (req, res) => {
        const { id } = req.params;
        const {
            name,
            author,
            published_at: publishedAt,
        } = req.body;

        return booksCollection.updateOne({ _id: ObjectId(id) }, { $set: { name, author, published_at: publishedAt } })
            .then(() => {
                return res.status(httpStatus.OK).json();
            })
            .catch((error) => {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.toString());
            });
    });

    router.get('/:id', (req, res) => {
        const { id } = req.params;

        return booksCollection.find({ _id: ObjectId(id) }).toArray()
            .then((result) => {
                return res.status(httpStatus.OK).json({ book: result });
            })
            .catch((error) => {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.toString());
            });
    });

    router.delete('/:id', (req, res) => {
        const { id } = req.params;

        return booksCollection.deleteOne({ _id: ObjectId(id) })
            .then(() => {
                return res.status(httpStatus.OK).json();
            })
            .catch((error) => {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.toString());
            });
    });

    app.use('/books', router);
};
