// 환경변수 불러오기
require('dotenv').config({path: '../.env'});

// mysql2 모듈 불러오기
const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host : process.env.DB_HOST,
    port: process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PW,
    database : process.env.DB_NAME,
    dateStrings: 'date',
});

module.exports = pool