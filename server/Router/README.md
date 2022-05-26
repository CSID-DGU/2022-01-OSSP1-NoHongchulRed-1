# DB API Spec

## DB Schema

![관계도](https://user-images.githubusercontent.com/83688807/170421754-23952661-a6ad-4a04-a320-396674c2d459.png)

## Endpoints

### Authentication

`POST /db/users/login`

Example request body:
```JSON
{
  "userid": "aaa",
  "password": "qwerasdf"
}
```

### Registration

`POST /db/users`

Example request body:
```JSON
{
  "userid": "aaa",
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

### Get Book

`GET /db/books/:isbn`

returns a Book

### Get Book report 1

`GET /db/bookreports/:isbn`

returns a Book report + Book data
all Book report on book

### Get Book report 2

`GET /db/bookreports/:userid`

returns a Book report + Book data
all Book report on user

### Get Book report 3

`GET /db/bookreports/:isbn/:userid`

returns a Book report + Book data
specific Book report on book and user

**※ Every endpoint is temporary. Database table can be changed soon.**
