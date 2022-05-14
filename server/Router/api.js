require('dotenv').config({path: '../.env'});

const express = require('express');
const path = require('path');
const axios = require('axios');

const router = express.Router();

// Authentication
router.get('/POST/db/users/login',(req,res) => {
    res.json({
        id: req.id,
        password: req.password,
    });
});

// Registration

router.post('/POST/db/users',(req,res) => {
    const user = new user(req.body);

    user.save()
    res.json({
        id: req.id,
        password: req.password,
        nickname: req.nickname,
        age: req.age,
        sexuality: req.sexuality,
    });
});

// Get User

router.get('/GET/db/users/:id',(req,res) => {
    res.json({
        id: req.id,
        password: req.password,
        nickname: req.nickname,
        age: req.age,
        sexuality: req.sexuality,
    });
});

// 미들웨어 함수를 특정 경로에 등록
router.get('/api/data', (req, res) => {
    res.json({ greeting: 'Hello World' });
});

router.get('/kakao/search/single/:title', async (req, res) => {
    await axios.get("https://dapi.kakao.com/v3/search/book?target=title",
    {
        params: {
            query: req.params.title
        },
        headers: {
            Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`
        }
    }).then(dataRes => {
        res.json(dataRes.data.documents[0])
    }).catch(error => {
        console.log(error.response)
    })
});

router.get('/kakao/search/multiple/:title', async (req, res) => {
    await axios.get("https://dapi.kakao.com/v3/search/book?target=title",
    {
        params: {
            query: req.params.title
        },
        headers: {
            Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`
        }
    }).then(dataRes => {
        res.json(dataRes.data)
    }).catch(error => {
        console.log(error.response)
    })
});

module.exports = router;