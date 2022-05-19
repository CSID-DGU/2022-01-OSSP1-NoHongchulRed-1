const express = require('express');
const path = require('path');
const pool = require('../pool');

const router = express.Router();

const bcrypt = require('bcrypt');

const session = require('express-session');
const res = require('express/lib/response');
//const index = path.join(__dirname, '../client/build/index.html');

const saltOrRounds = 10;

// Authentication
// 로그인 
// id에 해당하는 유저가 있는지 찾고 bcrypt.compare로 비밀번호를 비교
// 성공하면 세션에 유저 정보 담아서 프론트로 넘겨줌
router.post('/db/users/login', async (req,res) => {
    const id = req.body.id;
    const password = req.body.password;

    try {
        const data = await pool.query('SELECT * FROM BOOKWEB.UserTB WHERE id = ?', [id]);
        // id 유무 체크
        if (data[0].length != 0) {
            const userData = data[0][0];
            // password 체크
            var compare = await bcrypt.compare(password, userData.password)
            if (compare) {
                //req.session.nickname = userData.nickname;
                //req.session.id = userData.id;
                return res.json({message: "login success"})
            }
            else {
                return res.json({message: "wrong password"})
            }
        } else {
            return res.json({message : "no data"});
        }
    } catch (err) {
        return res.status(500).json(err)
    }
});

// Registration
// id가 중복인지 체크하고 없으면 데이터 값 가지고 insert
router.post('/db/users', async (req,res) => {
    const id = req.body.id;
    const password = req.body.password;
    const nickname = req.body.nickname;
    const age = req.body.age;
    const sexuality = req.body.sexuality;
    
    const hashPassword = bcrypt.hashSync(password, saltOrRounds); // 암호화
    try {
        const data = await pool.query('SELECT * FROM BOOKWEB.UserTB WHERE id = ?', [id])
        // id 유무 체크 (로그인과 달리 중복 id가 없어야 함)
        if (data[0].length == 0) {
            pool.query('INSERT INTO BOOKWEB.UserTB(id, password, nickname, age, sexuality) VALUES (?,?,?,?,?)',
            [id, hashPassword, nickname, age, sexuality]);
            return res.json({message: "register success"})
        }
        else {
            return res.json({message : "id is duplicated"});
        }
    } catch (err) {
        return res.json({message : "db error"});
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