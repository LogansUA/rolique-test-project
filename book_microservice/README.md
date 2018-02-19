# Books CRUD

## Get list of books

`GET /books`

## Create book

`POST /books`

Body:

```json
{
    "name": "EXAMPLE_BOOK_NAME",
    "author": "EXAMPLE_AUTHOR_NAME",
    "published_at": 1964
}
```

## Update book

`PUT /books/:id`

Body:

```json
{
    "name": "EXAMPLE_BOOK_NAME",
    "author": "EXAMPLE_AUTHOR_NAME",
    "published_at": 1964
}
```

## Get book

`GET /books/:id`

## Delete book

`DELETE /books/:id`
