# DB API Spec

## Endpoints

### Authentication

`POST /db/users/login`

Example request body:
```JSON
{
  "id": "aaa",
  "password": "qwerasdf"
}
```

### Registration

`POST /db/users`

Example request body:
```JSON
{
  "id": "aaa",
  "password": "qwerasdf",
  "nickname": "nick",
  "age": 0,
  "sexuality": "M"
}
```

### Get User

`GET /db/users/:id`

returns a User

**※ Every endpoint is temporary. Database table can be changed soon.**
