const express = require('express');
//const path = require('path');
const pool = require('../pool');

const router = express.Router();

//const index = path.join(__dirname, '../client/build/index.html');

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