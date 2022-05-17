const express = require('express');
const path = require('path');
const pool = require('../pool');

const router = express.Router();

const bcrypt = require('bcrypt');

const session = require('express-session');
const res = require('express/lib/response');
//const index = path.join(__dirname, '../client/build/index.html');

// Authentication
// 로그인 
// id에 해당하는 유저가 있는지 찾고 비밀번호 암호화 후 값을 비교해서 비번까지 맞는지 확인
// 성공하면 세션에 유저 정보 담아서 프론트로 넘기고
router.post('/db/users/login',(req,res) => { 
    const userId = req.id;
    const password = req.password;
    password = bcrypt.hashSync(password); // 암호화

    try {
        pool.query('SELECT * FROM BOOKWEB.UserTB WHERE id =?',[userId],(err,userinfo) => {// id 찾기 
            if (!userinfo[0]) {
                bcrypt.compare(password, userinfo[0].password,(err,tf) => { // 암호화된 비번 비교
                    if (tf !== true) {
                        return res.render('error',{message:"아이디 또는 비밀번호 확인해주세요."})
                    }
                    else {
                        req.session.nickname=userinfo[0].nickname;
                        req.session.id = userinfo[0].id;
                        return res.redirect('/');
                    }
                })
            }
        })
    } catch (err) {
        return res.status(500).json(err)
    }
    
});

// Registration
// id가 중복인지 체크하고 없으면 데이터 값 가지고 insert
router.post('/db/users',(req,res) => {
    const userId = req.id;
    const password = req.password;
    const nickname= req.nickname;
    const age = req.age;
    const sexuality = req.sexuality;
    
    password= bcrypt.hashSync(password);// 암호화
             // bcrypt가 hash 된 것끼리 비교하는 함수 있어서
    try {
        pool.query('SELECT * FROM BOOKWEB.UserTB WHERE id=? ?',[id],(err,data) => {
       
            if (data.length==0) { // data가 없다는 건 id가 DB에 없다 즉 로그인 성공
                console.log('회원가입 성공');
                pool.query('INSERT INTO BOOKWEB.UserTB(id, password, nickname, age, sexuality) VALUES (?,?,?,?,?)',
                [id, password, nickname, age, sexuality]);
                return res.redirect('/')
            }
            else {
                console.log(err)
                return res.render('error', { message: "회원가입 실패" })
            }
        });
    } catch (err) {
        return res.status(500).json(err)
    }
  
});

// Get User

router.get('/db/:userId', async (req, res, next) => {
    const { userId } = req.params
    try {
        const data = await pool.query('SELECT * FROM BOOKWEB.UserTB WHERE id = ?', [userId])
        return res.json(data[0])
    } catch (err) {
        return res.status(500).json(err)
    }
});

/*
router.get('*', (req, res) => {
    res.sendFile(index);
});
*/

module.exports = router;