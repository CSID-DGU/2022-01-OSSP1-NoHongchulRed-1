const express = require('express');
const pool = require('../pool');
const spawn = require('child_process').spawn;

const router = express.Router();

const bcrypt = require('bcrypt');

const saltOrRounds = 10;


// ===== DB resource API =====

// Authentication
// 로그인 
// id에 해당하는 유저가 있는지 찾고 bcrypt.compare로 비밀번호를 비교
// 성공하면 세션에 유저 정보 담아서 프론트로 넘겨줌
router.post('/api/db/users/login', async (req,res) => {
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

// Logout
// 로그아웃
router.get('/api/db/users/logout', async (req,res) => {
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
router.post('/api/db/users', async (req,res) => {
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
            pool.query('INSERT INTO BOOKWEB.UserTB(userid, password, nickname, age, sexuality, preference) VALUES (?,?,?,?,?,?)',
            [userid, hashPassword, nickname, age, sexuality, preference]);
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
router.post('/api/db/books', async (req,res) => {
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
router.post('/api/db/bookreports', async (req,res) => {
    if (req.session.userId) { // 로그인이 되어있는 상태인지 확인 안 되어 있으면 
        const title = req.body.title;
        const contents = req.body.contents;
        const rating = req.body.rating;
        const userid = req.body.userid;
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

// Get Book
// 책 정보 가져오기
router.get('/api/db/books/:isbn', async (req, res) => {
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
router.get('/api/db/bookreports/new', async (req, res) => {
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
router.get('/api/db/bookreports/view', async (req, res) => {
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
router.get('/api/db/books/bookreports/:isbn', async (req, res) => {
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
router.get('/api/db/users/bookreports/:userid', async (req, res) => {
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
router.get('/api/db/bookreports/:isbn/:userid', async (req, res) => {
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


// ===== Server resource API =====

// get session
router.get('/api/session', async (req, res) => {
    try {
        return res.json(Object.assign(req.session, {issuccess: true, message: "success"}));
    } catch (err) {
        return res.status(500).json(err);
    }
});

// get recommend data
router.get('/api/recommend/svd', async (req, res) => {
    // result 변수에 최종 데이터 담아 넘겨주면 될 듯
    var result;

    try {
        // 유저 배열 useridList, 책의 isbn 배열 isbnList
        var useridList = await pool.query('SELECT userid FROM BOOKWEB.UserTB WHERE NOT userid = ?', [req.session.userId]);
        var isbnList = await pool.query('SELECT isbn FROM BOOKWEB.BookTB ORDER BY isbn ASC');
        const ulen = useridList[0].length;
        const ilen = isbnList[0].length;
        
        //dataMat 배열 만들기 (초기화된 상태로)
        var dataMat = new Array(ulen);

        for (var i=0;i<ulen;i++) {
            dataMat[i] = new Array(ilen);
        }

        //dataMat 배열 채우기
        for (var i=0; i < ulen; i++) {
            for (var j=0; j < ilen; j++) {
                var ratingData = await pool.query('SELECT rating FROM BOOKWEB.BookReportTB WHERE userid = ? AND isbn = ?', [useridList[0][i].userid, isbnList[0][j].isbn]);
                if (ratingData[0].length == 0) {
                    dataMat[i][j] = 0;
                }
                else {
                    dataMat[i][j] = ratingData[0][0].rating;
                }
            }
        }

        // 데이터 없으면 파이썬 실행 전에 처리
        var reportNum = await pool.query('SELECT COUNT(rating) as cnt FROM BOOKWEB.BookReportTB WHERE userid=?', [req.session.userId]);
        if (reportNum[0][0].cnt < 2) {
            result = new Object();
            result.data = [];
            return res.json(Object.assign(result, {issuccess: false, message: "no recommand"}));
        }

        // 현재 세션의 유저 배열 만들기
        var sessionUserRating = [];
        for (var i=0; i < ilen; i++) {
            var ratingData = await pool.query('SELECT rating FROM BOOKWEB.BookReportTB WHERE userid=? AND isbn = ?', [req.session.userId, isbnList[0][i].isbn]);
            if (ratingData[0].length == 0) {
                sessionUserRating[i] = 0;
            }
            else {
                sessionUserRating[i] = ratingData[0][0].rating;
            }
        }

        dataMat.push(sessionUserRating); // 현재 추천해줄 유저의 평점 정보 추가

        const process = spawn('python', ['python/svd.py', JSON.stringify(dataMat)]);
        // stdout에 대한 콜백
        process.stdout.on('data', async function (data) {
            // 받아온 데이터는 추천 순위 인덱스 정보이므로 해당 인덱스에 해당하는 isbn을 찾아 실제 도서 정보를 넘겨줘야 함
            const recommendIndex = JSON.parse(data);
            var recommendIsbn = [];
            for (var i=0;i<recommendIndex.length;i++) {
                recommendIsbn.push(isbnList[0][recommendIndex[i]]);
            }

            // isbn 배열로 도서를 찾아서 도서 정보 리턴해줌
            // 모든 책을 다 읽은 경우 내용이 배열에 내용이 없을 수 있음, 프론트쪽에서 처리하여 '더이상 추천해줄 도서가 없습니다.'와 같이 메시지를 출력해주는 것이 좋을 듯
            var recommendBookArray = []; // 추천 도서 정보 배열
            for (var i=0; i<recommendIsbn.length; i++) {
                var data = await pool.query('SELECT * FROM BOOKWEB.BookTB WHERE isbn = ?', [recommendIsbn[i].isbn]);
                recommendBookArray[i] = data[0][0];
            }

            result = new Object();
            result.data = recommendBookArray;

            return res.json(Object.assign(result, {issuccess: true, message: "success"}));
            /*
            내용 출력 테스트용
            console.log("stdout: " + data.toString());
            result = data.toString();
            return res.json(result);
            */
        });

        // stderr에 대한 콜백
        process.stderr.on('data', function (data) {
            result = data.toString();
            return res.json(Object.assign(result, {issuccess: false, message: "error"}));
        });

    } catch (err) {
        return res.status(500).json(err);
    }
    
});

// get recommend data (cosine)
router.get('/api/recommend/cos', async (req, res) => {
    try {
        //나를 제외하고 독후감을 하나 이상 쓴 모든 유저의 userid, preference 가져오기
        try {
            var allUser = await pool.query('SELECT DISTINCT U.userid, U.preference FROM BOOKWEB.UserTB AS U, BOOKWEB.BookReportTB AS R WHERE U.userid = R.userid AND NOT U.userid = ?', [req.session.userId]);
            var userData = allUser[0];
        } catch {
            return res.json({issuccess: false, message: "user data get failed"});
        }
        var userList = [];
        var preferMat = [];

        for (var i=0; i<userData.length; i++) {
            userList.push(userData[i].userid); 
            preferMat.push(userData[i].preference.split(",")); 
        }

        var myData = await pool.query('SELECT preference FROM BOOKWEB.UserTB WHERE userid = ?', [req.session.userId]);
        var myPrefer = myData[0][0].preference.split(",");

        var result; 

        const process = spawn('python', ['python/cos.py', JSON.stringify(preferMat), JSON.stringify(myPrefer)]);
        process.stdout.setEncoding('utf8');
        // stdout에 대한 콜백
        process.stdout.on('data', async function (data) {
            const recommendIndex = JSON.parse(data);
            var similarUser = [];
            for (var i=0; i<recommendIndex.length; i++) {
                similarUser.push(userList[recommendIndex[i]]); 
            }

            //내가 독후감을 쓴 책의 isbn 목록 가져오기
            var data = await pool.query('SELECT isbn FROM BOOKWEB.BookReportTB WHERE userid = ?', [req.session.userId]);
            var myBook = data[0];
            
            var bookList = [];
            for(var i=0; i<myBook.length; i++) {
                bookList.push([myBook[i].isbn, 0]);
            }
            
            // 상위 3명 유저(similarUser[0]~[2])가 읽은 책 목록을 bookList에 업데이트, rating 추가
            // 상위 n명 유저에 대한 상수를 NUMOFUSER로 선언
            const NUMOFUSER = 3;
            var similar = [];
            for (var i=0;i<NUMOFUSER;i++) {
                var data = await pool.query('SELECT isbn, rating FROM BOOKWEB.BookReportTB WHERE userid = ?', [similarUser[i]]);
                similar.push(data[0]);
            }

            function RatingList(arr) { //[["isbn", raing1, rating2, ....], ...] 이렇게 추가함
                for (var i=0; i<arr.length; i++) {
                    var inBookList = 0;
                    for (var j=0; j<bookList.length; j++) {
                        if (bookList[j][0] == arr[i].isbn) { //이미 동일한 isbn이 리스트에 있을 시
                            bookList[j].push(arr[i].rating); //뒤에 rating 추가
                            inBookList = 1;
                            break;
                        }
                    }
                    if (inBookList == 0) //동일한 isbn이 리스트에 없을 시
                        bookList.push([arr[i].isbn, arr[i].rating]); //isbn과 rating을 리스트로 추가
                }
            }

            for (var i=0;i<NUMOFUSER;i++) {
                RatingList(similar[i]);
            }

            //bookList에서 내가 읽은 것 제외
            for (var i=0; i<myBook.length; i++) {
                for (var j=0; j<bookList.length; j++) {
                    if (bookList.length == 0) {
                        break;
                    }
                    if (bookList[j][0] == myBook[i].isbn) {
                        bookList.splice(j, 1);
                    }
                }
            }

            //책마다 모든 rating 더해서 평균 구하기
            if (bookList.length === 0) {
                return res.json(bookList);
            }
            var averageRating = [];
            for (var i=0; i<bookList.length; i++) {
                var sum = 0;
                for (var j=1; j<bookList[i].length; j++) {
                    sum += bookList[i][j];
                }
                var average = sum/NUMOFUSER;
                averageRating.push([bookList[i][0], average]);
            }

            //평점순으로 정렬
            averageRating.sort(function(a, b) {
                return b[1] - a[1];
            });

            //최고 평점인 책 최대 3개의 isbn 가져오기
            //평점 평균 상위 n권에 대한 상수를 NUMOFBOOK으로 선언
            const NUMOFBOOK = 3
            var recBookIsbn = [];
            var count = 0;
            for (var i=0; i<averageRating.length; i++) {
                if (count == NUMOFBOOK) {
                    break;
                } 
                recBookIsbn.push(averageRating[i][0]);
                count++;
            }

            // isbn 배열로 도서를 찾아서 도서 정보 리턴해줌
            var recBookArray = []; // 추천 도서의 정보 배열
            for (var i=0; i<recBookIsbn.length; i++) {
                var data = await pool.query('SELECT * FROM BOOKWEB.BookTB WHERE isbn = ?', [recBookIsbn[i]]);
                recBookArray[i] = data[0][0];
            }
            result = new Object();
            result.data = recBookArray;
            return res.json(Object.assign(result, {issuccess: true, message: "success"}));
        });
    
        // stderr에 대한 콜백
        process.stderr.on('data', function(data) {
            result = data.toString();
            return res.json(Object.assign(result, {issuccess: false, message: "error"}));
        });
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;