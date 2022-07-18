require('dotenv').config({path: '../.env'});

const express = require('express');
const axios = require('axios');

const router = express.Router();

// 카카오API 도서 검색(첫번째 검색 결과)
// 최종 결과물에서는 사용되지 않았음
router.get('/api/kakao/search/single/:title', async (req, res) => {
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

// 카카오API 도서 검색(1번~10번까지의 검색 결과)
router.get('/api/kakao/search/multiple/:title', async (req, res) => {
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