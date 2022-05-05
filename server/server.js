// express 모듈 불러오기
const express = require('express');

// express 객체 생성
const app = express();

// path 모듈 불러오기
const path = require('path');

// Router 모듈 불러오기
const routes = require("./Router/routes.js")

// 미들웨어 함수를 특정 경로에 등록
app.use('/api/data', function(req, res) {
    res.json({ greeting: 'Hello World' });
});

// 기본 포트를 app 객체에 설정
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running ${PORT}`));

// 리액트 정적 파일 제공
app.use(express.static(path.join(__dirname, '../client/build')));

// 라우트 설정
app.use(routes);
