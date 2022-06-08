const express = require('express');
const path = require('path');
const pool = require('../pool');
const spawn = require('child_process').spawn;

const router = express.Router();

const bcrypt = require('bcrypt');
const { isBuffer } = require('util');

//const index = path.join(__dirname, '../client/build/index.html');

const saltOrRounds = 10;

// get recommend data
router.get('/recommend', (req, res) => {
    // 여기에 모든 유저(현재 세션의 유저는 제외) 평점 정보 가져오는 쿼리문 필요 (userid, isbn 순으로 정렬)
    // 현재 세션의 유저는 별도로 가져와서 앞선 모든 유저 배열 마지막에 추가
    // json 형태로 만들어서 파이썬 파일에 넘겨주면 됨(구현됨)

    // 즉, 앞서 정렬된 순으로 isbn 정보만 저장하여 별도의 배열을 만들고
    // userid-isbn 순으로 정렬된 평점 데이터 배열(현재 세션의 유저 제외)를 넘겨줘야 함
    // isbn에 해당하는 독후감이 없는 자리는 0값을 채워줘야 함

    // isbn 배열 예시 : ["123456789 1234589789", "567891234 7894546213", ...]
    // 아래의 isbnList 배열 참고

    // userid-isbn 유저 평점 배열 예시 : [[0,5,6,7,10,0,0], [8,0,2,0,0,6,7], ...]
    // userid-isbn 유저 평점 배열 내부의 배열은 각 isbn에 대한 유저의 평점 데이터를 의미함
    // 즉, [0,5,6,7,10,0,0]이 유저1의 평점 정보, [8,0,2,0,0,6,7]이 유저2의 평점 정보... 와 같은 것
    // 0이 있는 자리는 실제 DB에 데이터가 없는 것이므로 체크하여 0값을 추가해줘야 함
    // 아래의 dataMat 배열 참고, push해서 추가한 것이 현재 추천해줄 유저의 평점 데이터

    // isbn 배열은 후처리에 사용할 예정이고, userid-isbn 유저 평점 배열은 json 형태로 변환하여 파이썬으로 전달(구현됨)
    // 설명 어려우니 모르면 물어볼 것!!

    // result 변수에 최종 데이터 담아 넘겨주면 될 듯
    var result;
    // 전체 isbn 정보 (임시 데이터)
    var isbnList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    // 전체 평점 정보 (임시 데이터)
    var dataMat = 
        [[4,4,6,5,3,4,8,9,3,2],
        [5,10,7,6,7,6,4,1,4,5],
        [2,3,4,4,5,4,7,7,2,2],
        [7,8,5,5,6,6,2,1,8,7],
        [4,6,7,5,3,3,1,1,5,5]]
    
    dataMat.push([0,5,4,0,3,2,0,7,4,4]) // 현재 추천해줄 유저의 평점 정보 추가

    // 테스트 후보 (임시 데이터)
    // [0,5,4,0,3,2,0,7,4,4]
    // [5,7,0,0,3,0,0,0,6,6]
    // [6,4,4,3,4,4,2,0,5,0]

    const process = spawn('python', ['python/main.py', JSON.stringify(dataMat)]);
    process.stdout.on('data', function (data) {
        //console.log("stdout: " + data.toString());
        //result = data.toString();
        // 받아온 데이터는 추천 순위 인덱스 정보이므로 해당 인덱스에 해당하는 isbn을 찾아 실제 도서 정보를 넘겨줘야 함
        const recommendIndex = JSON.parse(data);
        var recommendIsbn = []
        for (var i=0;i<recommendIndex.length;i++) {
            recommendIsbn.push(isbnList[recommendIndex[i]]);
        }
        // 테스트를 위해 isbn 정보를 리턴하도록 했지만, 이 isbn 배열로 도서를 찾아서 도서 정보 리턴해주면 됨
        return res.json(recommendIsbn);
    });

    process.stderr.on('data', function(data) {
        //console.log("stderr: " + data.toString());
        result = data.toString();
        return res.json(result);
    });
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
        
        // npm 모듈을 사용할지, 파이썬을 사용할지 결정 후 알려줄 것
        // 개발 진행 시 모르는 내용 있으면 물어볼 것
        // 프론트 쪽은 백엔드 작업이 익숙하지 않을 수 있으므로 앞뒤로 이미 완성된 코드 참고하며 작업할 것
        // 해당 작업 완료되면 프론트 쪽 추천페이지까지 마무리해야 함
        
        //['총류(기타)','철학','종교','사회학','자연과학','기술과학','예술','언어','문학','역사']
        //테스트 데이터

        var userList = ["test111", "test112", "test113", "test114", "test115"];

        var preferMat = 
        [[0,0,0,0,0,1,1,1,1,1], //test111
        [0,1,0,1,0,1,0,1,0,1], //test112
        [0,0,0,1,0,0,1,0,0,1], //test113
        [1,1,0,0,0,1,0,0,1,0], //test114
        [1,0,1,0,1,0,0,0,0,0]]; //test115

        var myPrefer = [0,1,1,0,0,0,0,1,0,0];
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

            //내가 읽은 책 목록을 bookList에 가져오기
            console.log(req.session.userId);
            var data = await pool.query('SELECT *, R.title AS ReportTitle FROM BOOKWEB.BookReportTB AS R JOIN BOOKWEB.BookTB AS B ON R.isbn = B.isbn WHERE R.userid = ? ORDER BY date DESC', [req.session.userId]);
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
            var data = await pool.query('SELECT *, R.title AS ReportTitle FROM BOOKWEB.BookReportTB AS R JOIN BOOKWEB.BookTB AS B ON R.isbn = B.isbn WHERE R.userid = ? ORDER BY date DESC', [similarUser[0]]);
            var similar1 = data[0];
            var data = await pool.query('SELECT *, R.title AS ReportTitle FROM BOOKWEB.BookReportTB AS R JOIN BOOKWEB.BookTB AS B ON R.isbn = B.isbn WHERE R.userid = ? ORDER BY date DESC', [similarUser[1]]);
            var similar2 = data[0];
            var data = await pool.query('SELECT *, R.title AS ReportTitle FROM BOOKWEB.BookReportTB AS R JOIN BOOKWEB.BookTB AS B ON R.isbn = B.isbn WHERE R.userid = ? ORDER BY date DESC', [similarUser[2]]);
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
            //console.log("책목록:", bookList);

            //bookList에서 내가 읽은 것 제외
            for(var i=0; i<myBook.length; i++) {
                for(var j=0; j<myBook.length; j++) {
                    if(bookList[i][0] == myBook[j].isbn)
                        bookList.splice(i, 1);
                }
            }
            //console.log("내가 읽은 책이 제거된 후 책목록: ", bookList);

            //책마다 모든 rating 더해서 평균 구하기
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