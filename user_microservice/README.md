# Users CRUD

## Get list of users

`GET /users`

## Create user

`POST /users`

Body:

```json
{
    "name": "EXAMPLE_USER_NAME"
    "email": "example@gmail.com"
}
```

## Update user

`PUT /users/:id`

Body:

```json
{
    "name": "EXAMPLE_USER_NAME"
    "email": "example@gmail.com"
}
```

## Get user

`GET /users/:id`

## Delete user

`DELETE /users/:id`
