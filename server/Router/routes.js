const express = require('express');
const path = require('path');
const pool = require('../pool');

const router = express.Router();

const bcrypt = require('bcrypt');

//const index = path.join(__dirname, '../client/build/index.html');

const saltOrRounds = 10;

// get session
router.get('/session', async (req, res) => {
    try {
        return res.json(Object.assign(req.session, {issuccess: true, message: "success"}));
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Authentication
// 로그인 
// id에 해당하는 유저가 있는지 찾고 bcrypt.compare로 비밀번호를 비교
// 성공하면 세션에 유저 정보 담아서 프론트로 넘겨줌
router.post('/db/users/login', async (req,res) => {
    const userid = req.body.userid;
    const password = req.body.password;

    try {
        const data = await pool.query('SELECT * FROM BOOKWEB.UserTB WHERE userid = ?', [userid]);
        // id 유무 체크
        if (data[0].length != 0) {
            const userData = data[0][0];
            // password 체크
            var compare = await bcrypt.compare(password, userData.password);
            if (compare) {
                req.session.userId = userData.userid;
                req.session.nickname = userData.nickname;
                req.session.save(err => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send("<h1>500 error</h1>");
                    }
                });
                return res.json(Object.assign(req.session, {issuccess: true, message: "success"}));
            } else {
                return res.json({issuccess: false, message: "wrong password"});
            }
        } else {
            return res.json({issuccess: false, message: "no data"});
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// 로그아웃
router.get('/db/users/logout', async (req,res) => {
    if (req.session.userId) {
        await req.session.destroy(function(err) {
            if (err) throw err;
        });
        return res.json({issuccess: true, message: "success"});
    } else {
        return res.json({issuccess: false, message: "not login yet"});
    }
});

// Registration
// id가 중복인지 체크하고 없으면 데이터 값 가지고 insert
router.post('/db/users', async (req,res) => {
    const userid = req.body.userid;
    const password = req.body.password;
    const nickname = req.body.nickname;
    const age = req.body.age;
    const sexuality = req.body.sexuality;
    
    const hashPassword = bcrypt.hashSync(password, saltOrRounds); // 암호화
    try {
        const data = await pool.query('SELECT * FROM BOOKWEB.UserTB WHERE userid = ?', [userid]);
        // id 유무 체크 (로그인과 달리 중복 id가 없어야 함)
        if (data[0].length == 0) {
            pool.query('INSERT INTO BOOKWEB.UserTB(userid, password, nickname, age, sexuality) VALUES (?,?,?,?,?)',
            [userid, hashPassword, nickname, age, sexuality]);
            return res.json({issuccess: true, message: "register success"});
        } else {
            return res.json({issuccess: false, message: "id is duplicated"});
        }
    } catch (err) {
        return res.json({issuccess: false, message: "db error"});
    }
});

// Add book data
// 책 등록
router.post('/db/books', async (req,res) => {
    const isbn = req.body.isbn;
    const title = req.body.title;
    const authors = req.body.authors;
    const publisher = req.body.publisher;
    const thumbnail = req.body.thumbnail;
    try {
        await pool.query('INSERT INTO BOOKWEB.BookTB(isbn, title, authors, publisher, thumbnail) VALUES (?,?,?,?,?)',
        [isbn, title, authors, publisher, thumbnail]);
        return res.json({issuccess: true, message: "add book success"});
    } catch (err) {
        return res.json({issuccess: false, message: "db error"});
    }
});

// Create book report
// 독후감 등록
router.post('/db/bookreports', async (req,res) => {
    //if (req.session.userId) { // 로그인이 되어있는 상태인지 확인 안 되어 있으면 
        const title = req.body.title;
        const contents = req.body.contents;
        const rating = req.body.rating;
        const userId = req.body.userId; // 여기 나중에 req.session.userId로 바뀌어야 함
        const isbn = req.body.isbn;
        try {
            await pool.query('INSERT INTO BOOKWEB.BookReportTB(title, contents, rating, userId, isbn) VALUES (?,?,?,?,?)',
            [title, contents, rating, userId, isbn]);
            return res.json({issuccess: true, message: "create book report success"});
        } catch (err) {
            return res.json({issuccess: false, message: "db error"});
        }
    //} else {
       // return res.json({issuccess: false, message: "not login yet"}); // 여기서 로그인하고 오라고 함
    //}
});

// Get User
// 유저 정보 가져오기
router.get('/db/users/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const data = await pool.query('SELECT * FROM BOOKWEB.UserTB WHERE userid = ?', [userId]);
        return res.json(data[0][0]);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get Book
// 책 정보 가져오기
router.get('/db/books/:isbn', async (req, res) => {
    const {isbn} = req.params;
    try {
        const bodata = await pool.query('SELECT * FROM BOOKWEB.BookTB WHERE isbn = ?', [isbn]);
        return res.json(bodata[0][0]);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get Book report 1
// 독후감 정보 가져오기(isbn 기준)
router.get('/db/bookreports/:isbn', async (req, res) => {
    const {isbn} = req.params; 
    try {
        const redata = await pool.query('SELECT * FROM BOOKWEB.BookReportTB WHERE isbn = ?', [isbn]);
        return res.json(redata[0]);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get Book report 2
// 독후감 정보 가져오기(userid 기준)
router.get('/db/bookreports/:userid', async (req, res) => {
    // 내용 구현 필요
});

// Get Book report 3
// 독후감 정보 가져오기(isbn, userid 기준 - 한 개만 선택됨)
router.get('/db/bookreports/:isbn/:userid', async (req, res) => {
    // 내용 구현 필요
    // 고유한 독후감 정보를 가져오는 것은 단일 독후감 게시물을 읽을 때이므로 조회수에 해당하는 views 값을 하나 증가시켜 update해줘야 함
});

/*
router.get('*', (req, res) => {
    res.sendFile(index);
});
*/

module.exports = router;