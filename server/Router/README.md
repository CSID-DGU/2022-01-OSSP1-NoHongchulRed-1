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

### Add book data

`POST /db/books`

Example request body:
```JSON
{
  "title": "harry porter",
  "contents": "harry porter is ...",
  "isbn": "123456789 12345789",
  "datetime": "2014-11-17T00:00:00.000+09:00",
  "authors": "abcd efgh, ijkl mnop",
  "price": 10000,
  "publisher": "abcdef",
  "thumbnail": "https://search.daum.net/search?..."
}
```

### Create book report

`POST /db/bookreports`

Example request body:
```JSON
{
  "title": "harry porter",
  "contents": "I like this book.",
  "rating": 8,
  "userid": "abcd",
  "bookid": 123
}
```

### Get User

`GET /db/users/:id`

returns a User

### Get book

`GET /db/books/:id`

returns a Book

### Get book report

`GET /db/bookreports/:id`

returns a Book report

**※ Every endpoint is temporary. Database table can be changed soon.**
