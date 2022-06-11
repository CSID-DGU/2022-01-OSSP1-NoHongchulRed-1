const express = require('express');
const path = require('path');
const pool = require('../pool');
const spawn = require('child_process').spawn;

const router = express.Router();

const bcrypt = require('bcrypt');

//const index = path.join(__dirname, '../client/build/index.html');

const saltOrRounds = 10;

// ===== Server resource API =====

// get session
router.get('/session', async (req, res) => {
    try {
        return res.json(Object.assign(req.session, {issuccess: true, message: "success"}));
    } catch (err) {
        return res.status(500).json(err);
    }
});

// get recommend data
router.get('/recommend/svd', async (req, res) => {
    try {
        // 유저 배열 udata, 책의 isbn 배열 isbnList
        var udata = await pool.query('SELECT userid FROM BOOKWEB.UserTB WHERE NOT userid= ?', [req.session.userId]);
        var isbnList = await pool.query('SELECT isbn FROM BOOKWEB.BookTB ORDER BY isbn ASC');
        const ulen = udata[0].length;
        const ilen = isbnList[0].length;
        
        //dataMat 배열 만들기 (초기화된 상태로)
        var dataMat = new Array(ulen);

        for (var i=0;i<ulen;i++) {
            dataMat[i] = new Array(ilen);
        }

        //dataMat 배열 채우기
        for (var i=0; i < ulen; i++) {
            for (var j=0; j < ilen; j++) {
                var ata = await pool.query('SELECT rating FROM BOOKWEB.BookReportTB WHERE userid = ? AND isbn = ?', [udata[0][i].userid, isbnList[0][j].isbn]);
                if (ata[0].length == 0) {
                    dataMat[i][j] = 0;
                }
                else {
                    dataMat[i][j] = ata[0][0].rating;
                }
            }
        }

        // 현재 세션의 유저 배열 만들기
        var sesuser = [];
        for (var i=0; i < ilen; i++) {
        nodat = await pool.query('SELECT rating FROM BOOKWEB.BookReportTB WHERE userid=? AND isbn=?', [req.session.userId, isbnList[0][i].isbn]);
            if (nodat[0].length == 0) {
                sesuser[i] = 0;
            }
            else {
                sesuser[i] = nodat[0][0].rating;
            }
        }

        dataMat.push(sesuser) // 현재 추천해줄 유저의 평점 정보 추가

        // result 변수에 최종 데이터 담아 넘겨주면 될 듯
        var result;

        const process = spawn('python', ['python/svd.py', JSON.stringify(dataMat)]);
        process.stdout.on('data', async function (data) {
            

            // 받아온 데이터는 추천 순위 인덱스 정보이므로 해당 인덱스에 해당하는 isbn을 찾아 실제 도서 정보를 넘겨줘야 함
            const recommendIndex = JSON.parse(data);
            var recommendIsbn = []
            for (var i=0;i<recommendIndex.length;i++) {
                recommendIsbn.push(isbnList[0][recommendIndex[i]]);
            }

            // 테스트를 위해 isbn 정보를 리턴하도록 했지만, 이 isbn 배열로 도서를 찾아서 도서 정보 리턴해주면 됨
            // 모든 책을 다 읽은 경우 내용이 배열에 내용이 없을 수 있음, 프론트쪽에서 처리하여 '더이상 추천해줄 도서가 없습니다.'와 같이 메시지를 출력해주는 것이 좋을 듯
            var rbarr = []; // 추천 도서 배열
            for (var i=0; i < recommendIsbn.length; i++) {
                var fdata = await pool.query('SELECT * FROM BOOKWEB.BookTB WHERE isbn = ?', [recommendIsbn[i].isbn]);
                rbarr[i] = fdata[0][0];
            }

            return res.json(rbarr);
            /*
            내용 출력 테스트용
            console.log("stdout: " + data.toString());
            result = data.toString();
            return res.json(result);
            */
        });

        process.stderr.on('data', function (data) {
            //console.log("stderr: " + data.toString());
            result = data.toString();
            return res.json(result);
        });

    } catch (err) {
        return res.status(500).json(err);
    }
    
});

// get recommend data (cosine)
router.get('/session/cos', async (req, res) => {
    try {
        // 코사인 유사도 관련 내용 구현 필요
        // 1. 모든 유저에 대한 도서 분류별 관심도 정보 가져오기(현재 세션 유저 제외)
        // 2. 현재 세션 유저에 대한 도서 관심도 정보 가져오기
        // 3. 현재 세션 유저와 모든 유저에 대해 코사인 유사도 계산하기
        // (하나씩 일대일로 계산하는 것, 나-유저1, 나-유저2, ...)
        // 4. 계산 결과에 따라 가장 유사한 상위 n명 선택하기
        // (n값에 대한 기준은 프론트쪽에서 테스트해보고 적절한 수치를 적용할 것)
        // 5. 내가 읽지 않은 도서에 대해 유사도 상위 유저 집합의 평균 평점 계산
        // (내가 안 읽은 것을 다른 유저도 안 읽었다면 해당 도서에 대한 해당 유저의 평점은 0점으로 취급하고 계산)
        // 6. 내가 읽지 않은 도서 중 평균 평점이 가장 높은 도서 순으로 추천
        // (추천은 svd에서와 같이 isbn 정보를 가지고 하나씩 찾아서 데이터를 만들어주면 됨)


        /* 임시데이터 >>> 
            var userList = ["test111", "test112", "test113", "test114", "test115"];
            var preferMat = 
            [[0,0,0,0,0,1,1,1,1,1], //test111
            [0,1,0,1,0,1,0,1,0,1], //test112
            [0,0,0,1,0,0,1,0,0,1], //test113
            [1,1,0,0,0,1,0,0,1,0], //test114
            [1,0,1,0,1,0,0,0,0,0]]; //test115
            var myPrefer = [0,1,1,0,0,0,0,1,0,0];
            ['총류(기타)','철학','종교','사회과학','자연과학','기술과학','예술','언어','문학','역사']
        */
        //나를 제외한 모든 유저의  userid, preference 가져오기
        try{
            var allUser = await pool.query('SELECT userid, preference FROM BOOKWEB.UserTB WHERE userid NOT IN (\'testC\')'); //나중에수정!!!!!!!!!!
            console.log("!!!!!!");
            var userData = allUser[0];
        }catch{
            return res.json({issuccess: false, message: "user data get failed"});
        }
        var userList = [];
        var preferMat = [];
        console.log("userData", userData);
        for (var i=0; i<userData.length; i++) {
            userList.push(userData[i].userid); 
            preferMat.push(userData[i].preference.split(",")); 
        }
        //console.log("userList", userList);
        //console.log("preferMat", preferMat);

        var myData = await pool.query('SELECT preference FROM BOOKWEB.UserTB WHERE userid = \'testC\''); //나중에수정
        var myPrefer = myData[0][0].preference.split(",");
        //console.log("내선호도", myPrefer);

        //console.log(JSON.stringify(preferMat));
        //return res.json(preferMat);
        //console.log(">>>", req.session.userId);
        var myId = "test110";

        const process2 = spawn('python', ['python/cos.py', JSON.stringify(preferMat), JSON.stringify(myPrefer)]);

        process2.stdout.on('data', async function (data) {
            //return res.json(data.toString());
            const recommendIndex = JSON.parse(data);
            console.log(recommendIndex[2]);
            var similarUser = []
            for (var i=0; i<recommendIndex.length; i++) {
                similarUser.push(userList[recommendIndex[i]]); 
            }
            //console.log(similarUser);
            //return res.json(similarUser);
            //similarUser : [ 'test112', 'test115', 'test114' ]

            //내가 독후감을 쓴 책의 isbn 목록 가져오기
            console.log(req.session.userId);
            //var data = await pool.query('SELECT R.isbn FROM BOOKWEB.BookReportTB AS R, BOOKWEB.BookTB AS B WHERE R.isbn = B.isbn AND R.userid = ?', [req.session.userId]);
            var data = await pool.query('SELECT R.isbn FROM BOOKWEB.BookReportTB AS R WHERE R.userid = ?', [req.session.userId]);
            console.log("내가읽은 책(독후감 쓴 책)", data[0]);
            var myBook = data[0];
            
            /*
            const id = "test110";
            const myBook = [
                {userid: "test110", isbn: "isbn1", rating: 9 },
                {userid: "test110", isbn: "isbn2", rating: 5 },
                {userid: "test110", isbn: "isbn3", rating: 7 },
            ]
            */
            var bookList = [];
            for(var i=0; i<myBook.length; i++) {
                bookList.push([myBook[i].isbn, 0]);
            }
            
            //상위 3명 유저(similarUser[0]~[2])가 읽은 책 목록을 bookList에 업데이트, rating 추가
            var data = await pool.query('SELECT R.isbn, R.rating FROM BOOKWEB.BookReportTB AS R WHERE R.userid = ?', [similarUser[0]]);
            var similar1 = data[0];
            var data = await pool.query('SELECT R.isbn, R.rating FROM BOOKWEB.BookReportTB AS R WHERE R.userid = ?', [similarUser[1]]);
            var similar2 = data[0];
            var data = await pool.query('SELECT R.isbn, R.rating FROM BOOKWEB.BookReportTB AS R WHERE R.userid = ?', [similarUser[2]]);
            var similar3 = data[0];
            /*
            const similar1 = [
                {userid: "test112", isbn: "isbn2", rating: 6},
                {userid: "test112", isbn: "isbn5", rating: 7},
                {userid: "test112", isbn: "isbn7", rating: 9}
            ];
            const similar2 = [
                {userid: "test115", isbn: "isbn7", rating: 6},
                {userid: "test115", isbn: "isbn8", rating: 7},
                {userid: "test115", isbn: "isbn3", rating: 5}
            ];
            const similar3 = [
                {userid: "test114", isbn: "isbn10", rating: 10},
                {userid: "test114", isbn: "isbn5", rating: 7},
                {userid: "test114", isbn: "isbn11", rating: 3}
            ];
            */
            /*
            for(var i=0; i<similar1.length; i++) {
                if(bookList.includes(similar1[i].isbn) == false) 
                    bookList.push(similar1[i].isbn);
            }
             */

            function RatingList(arr) { //[["isbn", raing1, rating2, ....], ...] 이렇게 추가함
                for(var i=0; i<arr.length; i++) {
                    var inBookList = 0;
                    for(var j=0; j<bookList.length; j++){
                        if(bookList[j][0] == arr[i].isbn) { //이미 동일한 isbn이 리스트에 있을 시
                            bookList[j].push(arr[i].rating); //뒤에 rating 추가
                            inBookList = 1;
                            break;
                        }
                    }
                    if(inBookList == 0) //동일한 isbn이 리스트에 없을 시
                        bookList.push([arr[i].isbn, arr[i].rating]); //isbn과 rating을 리스트로 추가
                }
            }
            RatingList(similar1);
            RatingList(similar2);
            RatingList(similar3);
            console.log("책목록:", bookList);

            //bookList에서 내가 읽은 것 제외
            for(var i=0; i<myBook.length; i++) {
                for(var j=0; j<bookList.length; j++) {
                    if(bookList.length == 0){
                        break;
                    }
                    if(bookList[j][0] == myBook[i].isbn){
                        bookList.splice(j, 1);
                    }
                }
            }
            console.log("내가 읽은 책이 제거된 후 책목록: ", bookList);

            //책마다 모든 rating 더해서 평균 구하기
            if(bookList.length === 0) {
                console.log("추천해줄 책이 없습니다.");
                return res.json({issuccess: false, message: "추천해줄 책이 없습니다."});
            }
            var averageRating = [];
            for(var i=0; i<bookList.length; i++) {
                var sum = 0;
                for(var j=1; j<bookList[i].length; j++){
                    sum += bookList[i][j];
                }
                var average = sum/3.0;
                averageRating.push([bookList[i][0], average]);
            }
            console.log("평점평균::", averageRating);

            //평점순으로 정렬
            averageRating.sort(function(a, b) {
                return b[1] - a[1];
            });
            console.log("평점순 정렬::", averageRating);

            //최고 평점인 책 3개의 isbn 가져오기
            var recBookIsbn = [];
            for(var i=0; i<3; i++) {
                recBookIsbn.push(averageRating[i][0]);
            }
            console.log(recBookIsbn);
            return res.json(recBookIsbn);
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


// ===== DB resource API =====

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