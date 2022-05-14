const express = require('express');
//const path = require('path');
const pool = require('../pool');

const router = express.Router();

//const index = path.join(__dirname, '../client/build/index.html');

// Authentication
router.post('/db/users/login',(req,res) => {
    let {id, password} = req.body;

    pool.query('SELECT * FROM BOOKWEB.UserTB WHERE id =?',id,err => {
        if (err) {
            return res.render('error',{message: "로그인 에러"})
        }
        else {
            return res.redirect('/');
        }
     });
});

// Registration

router.post('/db/users',(req,res) => {
    const userId = req.id;
    const password = req.password;
    const nickname= req.nickname;
    const age = req.age;
    const sexuality = req.sexuality;
    
    
    pool.query('SELECT * FROM BOOKWEB.UserTB WHERE id=? ?',[id],(err) => {
        if (err) {
            console.log(err)
            return res.render('error', { message: "회원가입 실패" })
        }
        else {
            console.log('회원가입 성공');
            pool.query('INSERT INTO BOOKWEB.UserTB(id, password, nickname, age, sexuality) VALUES (?,?,?,?,?)',
            [id, password, nickname, age, sexuality]);
            return res.redirect('/')
        }

    });
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
})

/*
router.get('*', (req, res) => {
    res.sendFile(index);
});
*/

module.exports = router;