const express = require('express');
const path = require('path');
const pool = require('../pool');
const spawn = require('child_process').spawn;

const router = express.Router();

const bcrypt = require('bcrypt');
const { stringify } = require('querystring');

//const index = path.join(__dirname, '../client/build/index.html');

const saltOrRounds = 10;

// get recommend data
router.get('/recommend',async(req, res) => {
    try {
        // 유저 배열 udata, 책의 isbn 배열 isbnList
        var udata = await pool.query('SELECT userid FROM BOOKWEB.UserTB WHERE NOT userid= ?',[req.session.userId]);
        var isbnList = await pool.query('SELECT isbn FROM BOOKWEB.BookTB ORDER BY isbn ASC');
        const ulen = udata[0].length;
        const ilen = isbnList[0].length;
        
        //dataMat 배열 만들기 (초기화된 상태로)
        var dataMat = new Array(ulen);

        for (var i=0;i<ulen;i++) {
            dataMat[i] = new Array(ilen);
        }

        //dataMat 배열 채우기
        for (var i =0 ; i < ulen ; i++) {
            for (var j=0 ; j < ilen ; j++) {
                var ata = await pool.query('SELECT rating FROM BOOKWEB.BookReportTB WHERE userid = ? AND isbn = ?',[udata[0][i].userid,isbnList[0][j].isbn]);
                if (ata[0].length ==0) {
                    dataMat[i][j] = 0;
                }
                else {
                    dataMat[i][j] = ata[0][0].rating;
                }
            }
        }

        // 현재 세션의 유저 배열 만들기
        var sesuser = [];
        for (var i = 0; i< ilen ; i++) {
        nodat = await pool.query('SELECT rating FROM BOOKWEB.BookReportTB WHERE userid=? AND isbn=?', [req.session.userId, isbnList[0][i].isbn]);
            if (nodat[0].length == 0 ) {
                sesuser[i] = 0;
            }
            else {
                sesuser[i] = nodat[0][0].rating;
            }
        }

        dataMat.push(sesuser) // 현재 추천해줄 유저의 평점 정보 추가

        //console.log(dataMat);

        // result 변수에 최종 데이터 담아 넘겨주면 될 듯
        var result;

        const process = spawn('python', ['python/main.py', JSON.stringify(dataMat)]);
        process.stdout.on('data', function (data) {
            console.log("stdout: " + data.toString());
            result = data.toString();

            // 받아온 데이터는 추천 순위 인덱스 정보이므로 해당 인덱스에 해당하는 isbn을 찾아 실제 도서 정보를 넘겨줘야 함
            const recommendIndex = JSON.parse(data);
            var recommendIsbn = []
            for (var i=0;i<recommendIndex.length;i++) {
                recommendIsbn.push(isbnList[recommendIndex[i]]);
            }
        
            // 테스트를 위해 isbn 정보를 리턴하도록 했지만, 이 isbn 배열로 도서를 찾아서 도서 정보 리턴해주면 됨
            /*var recdata = pool.query('SELECT * FROM BOOKWEB.BookTB WHERE isbn=?',[recommendIsbn]);
            return res.json(recdata); //여기 구현2*/
            return res.json(recommendIsbn);
        });

        process.stderr.on('data', function(data) {
            //console.log("stderr: " + data.toString());
            result = data.toString();
            return res.json(result);
        });

    
         
    } catch (err) {
        return res.status(500).json(err);
    }
    
});

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
    const preference = req.body.preference;
    
    const hashPassword = bcrypt.hashSync(password, saltOrRounds); // 암호화
    try {
        const data = await pool.query('SELECT * FROM BOOKWEB.UserTB WHERE userid = ?', [userid]);
        // id 유무 체크 (로그인과 달리 중복 id가 없어야 함)
        if (data[0].length == 0) {
            // 프론트쪽 완성되면 여기에 preference 추가하여 쿼리 수정할 것
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
    if (req.session.userId) { // 로그인이 되어있는 상태인지 확인 안 되어 있으면 
        const title = req.body.title;
        const contents = req.body.contents;
        const rating = req.body.rating;
        const userid = req.body.userid; // 여기 나중에 req.session.userId로 바뀌어야 함
        const isbn = req.body.isbn;
        try {
            await pool.query('INSERT INTO BOOKWEB.BookReportTB(title, contents, rating, userid, isbn) VALUES (?,?,?,?,?)',
            [title, contents, rating, userid, isbn]);
            return res.json({issuccess: true, message: "create book report success"});
        } catch (err) {
            return res.json({issuccess: false, message: "db error"});
        }
    } else {
       return res.json({issuccess: false, message: "not login yet"}); // 여기서 로그인하고 오라고 함
    }
});

// Get User
// 유저 정보 가져오기
router.get('/db/users/:userid', async (req, res) => {
    const { userid } = req.params;
    try {
        const data = await pool.query('SELECT * FROM BOOKWEB.UserTB WHERE userid = ?', [userid]);
        if (data[0].length != 0) {
            return res.json(Object.assign(data[0][0], {issuccess: true, message: "success"}));
        } else {
            return res.json({issuccess: false, message: "no data"});
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get Book
// 책 정보 가져오기
router.get('/db/books/:isbn', async (req, res) => {
    const {isbn} = req.params;
    try {
        const data = await pool.query('SELECT * FROM BOOKWEB.BookTB WHERE isbn = ?', [isbn]);
        if (data[0].length != 0) {
            return res.json(Object.assign(data[0][0], {issuccess: true, message: "success"}));
        } else {
            return res.json({issuccess: false, message: "no data"});
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get Book report 1
// 독후감 정보 가져오기(모든 정보, 최신순 정렬)
router.get('/db/bookreports/new', async (req, res) => {
    try {
        const data = await pool.query('SELECT *, R.title AS ReportTitle FROM BOOKWEB.BookReportTB AS R JOIN BOOKWEB.BookTB AS B ON R.isbn = B.isbn ORDER BY date DESC');
        if (data[0].length != 0) {
            const jsonData = new Object();
            jsonData.data = data[0];
            return res.json(Object.assign(jsonData, {issuccess: true, message: "success"}));
        } else {
            return res.json({issuccess: false, message: "no data"});
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get Book report 2
// 독후감 정보 가져오기(모든 정보, 조회수순 정렬)
router.get('/db/bookreports/view', async (req, res) => {
    try {
        const data = await pool.query('SELECT *, R.title AS ReportTitle FROM BOOKWEB.BookReportTB AS R JOIN BOOKWEB.BookTB AS B ON R.isbn = B.isbn ORDER BY views DESC');
        if (data[0].length != 0) {
            const jsonData = new Object();
            jsonData.data = data[0];
            return res.json(Object.assign(jsonData, {issuccess: true, message: "success"}));
        } else {
            return res.json({issuccess: false, message: "no data"});
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get Book report 3
// 독후감 정보 가져오기(isbn 기준, 최신순 정렬)
router.get('/db/books/bookreports/:isbn', async (req, res) => {
    const {isbn} = req.params; 
    try {
        const data = await pool.query('SELECT *, R.title AS ReportTitle FROM BOOKWEB.BookReportTB AS R JOIN BOOKWEB.BookTB AS B ON R.isbn = B.isbn WHERE R.isbn = ? ORDER BY date DESC', [isbn]);
        if (data[0].length != 0) {
            const jsonData = new Object();
            jsonData.data = data[0];
            return res.json(Object.assign(jsonData, {issuccess: true, message: "success"}));
        } else {
            return res.json({issuccess: false, message: "no data"});
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get Book report 4
// 독후감 정보 가져오기(userid 기준, 최신순 정렬)
router.get('/db/users/bookreports/:userid', async (req, res) => {
    const { userid } = req.params;
    try {
        const data = await pool.query('SELECT *, R.title AS ReportTitle FROM BOOKWEB.BookReportTB AS R JOIN BOOKWEB.BookTB AS B ON R.isbn = B.isbn WHERE R.userid = ? ORDER BY date DESC', [userid]);
        if (data[0].length != 0) {
            const jsonData = new Object();
            jsonData.data = data[0];
            return res.json(Object.assign(jsonData, {issuccess: true, message: "success"}));
        } else {
            return res.json({issuccess: false, message: "no data"});
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get Book report 5
// 독후감 정보 가져오기(isbn, userid 기준 - 한 개만 선택됨)
router.get('/db/bookreports/:isbn/:userid', async (req, res) => {
    const {userid} = req.params;
    const {isbn} = req.params;
    try {
        // 고유한 독후감 정보를 가져오는 것은 단일 독후감 게시물을 읽을 때이므로 조회수에 해당하는 views 값을 하나 증가시켜 update해줘야 함
        await pool.query('UPDATE BOOKWEB.BookReportTB SET views = views+1 WHERE userid = ? AND isbn = ?', [userid, isbn]);
        const data = await pool.query('SELECT *, R.title AS ReportTitle FROM BOOKWEB.BookReportTB AS R JOIN BOOKWEB.BookTB AS B ON R.isbn = B.isbn WHERE R.userid = ? AND R.isbn = ?', [userid, isbn]);
        if (data[0].length != 0) {
            return res.json(Object.assign(data[0][0], {issuccess: true, message: "success"}));
        } else {
            return res.json({issuccess: false, message: "no data"});
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

/*
router.get('*', (req, res) => {
    res.sendFile(index);
});
*/

module.exports = router;