# API Spec

## DB Schema

![관계도](https://user-images.githubusercontent.com/83688807/171643643-e37e77cc-79fe-4967-81d4-fbe7ca3c8602.png)

## Endpoints (DB resource)

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
  "sexuality": "M",
  "preference": "0,1,1,0,1,0,0,0,1,0"
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

`GET /db/users/:userid`

returns a User.

### Get Book

`GET /db/books/:isbn`

returns a Book.

### Get Book report 1

`GET /db/bookreports/new`

returns a Book report + Book data.  
all Book report (ordered by latest date)

### Get Book report 2

`GET /db/bookreports/view`

returns a Book report + Book data.  
all Book report (ordered by view)

### Get Book report 3

`GET /db/books/bookreports/:isbn`

returns Book reports + Book datas.  
all Book report on book (ordered by latest date)

### Get Book report 4

`GET /db/users/bookreports/:userid`

returns a Book reports + Book datas.  
all Book report on user (ordered by latest date)

### Get Book report 5

`GET /db/bookreports/:isbn/:userid`

returns a Book report + Book data.  
specific Book report on book and user

## Endpoints (Server resource)

### Get Session data

`GET /session`

returns a session data (userid + nickname + others)

### Get Recommend data

`GET /recommend`

returns a recommend data

**※ Every endpoint is temporary. Database table can be changed soon.**
