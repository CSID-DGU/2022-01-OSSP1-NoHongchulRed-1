# API Spec

## DB Schema

![관계도](https://user-images.githubusercontent.com/83688807/171643643-e37e77cc-79fe-4967-81d4-fbe7ca3c8602.png)

## Endpoints (DB resource)

### Authentication

`POST /api/db/users/login`

Example request body:
```JSON
{
  "userid": "aaa",
  "password": "qwerasdf"
}
```

### Logout

`GET /api/db/users/logout`

Logout from website.

### Registration

`POST /api/db/users`

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

`POST /api/db/books`

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

`POST /api/db/bookreports`

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

### Get Book

`GET /api/db/books/:isbn`

returns a Book.

### Get Book report 1

`GET /api/db/bookreports/new`

returns a Book report + Book data.  
all Book report (ordered by latest date)

### Get Book report 2

`GET /api/db/bookreports/view`

returns a Book report + Book data.  
all Book report (ordered by view)

### Get Book report 3

`GET /api/db/books/bookreports/:isbn`

returns Book reports + Book data.  
all Book report on book (ordered by latest date)

### Get Book report 4

`GET /api/db/users/bookreports/:userid`

returns a Book reports + Book data.  
all Book report on user (ordered by latest date)

### Get Book report 5

`GET /api/db/bookreports/:isbn/:userid`

returns a Book report + Book data.  
specific Book report on book and user

## Endpoints (Server resource)

### Get Session data

`GET /api/session`

returns a session data. (userid + nickname + others)

### Get Recommend data (svd)

`GET /api/recommend/svd`

returns a svd recommend data.

### Get Recommend data (cosine)

`GET /api/recommend/cos`

returns a cosine recommend data.

## Endpoints (Kakao API)

### Get Book Search Data (Single)

`GET /api/kakao/search/single/:title`

returns one book data.

### Get Book Search Data (Multiple)

`GET /api/kakao/search/multiple/:title`

returns 10 book data.