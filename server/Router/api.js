require('dotenv').config({path: '../.env'});

const express = require('express');
const path = require('path');
const axios = require('axios');

const router = express.Router();

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