# DB API Spec

## DB Schema

![관계도](https://user-images.githubusercontent.com/83688807/169657734-aadd6926-88fc-4d2c-aef4-d9b25fd24c1a.png)

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
  "isbn": "123456789 12345789",
  "title": "harry porter",
  "authors": "abcd efgh, ijkl mnop",
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
  "isbn": "123456789 12345789"
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

returns a Book report + Book data

**※ Every endpoint is temporary. Database table can be changed soon.**
