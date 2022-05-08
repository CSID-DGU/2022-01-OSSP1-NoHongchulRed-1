// express 모듈 불러오기
const express = require('express');

// express 객체 생성
const app = express();

// path 모듈 불러오기
const path = require('path');

// Router 모듈 불러오기
const routes = require("./Router/routes.js")
const api = require("./Router/api.js")

// 기본 포트를 app 객체에 설정
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running ${PORT}`));

// 리액트 정적 파일 제공
app.use(express.static(path.join(__dirname, '../client/build')));

// 라우트 설정
app.use(api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// 아래 코드는 현재 오류 있어서 위에 것으로 대체
//app.use(routes);