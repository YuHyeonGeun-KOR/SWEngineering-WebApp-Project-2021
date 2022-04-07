const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../models/index')
require('dotenv').config();

const { verifyToken } = require('./middleware');

const router = express.Router();

// 토큰을 발급하는 라우터
router.post('/', async (req, res) => {
    try {
        const user = await db.User.findOne({ where: { email: req.body.email }});
        const userInfo = {
            email: user.email,
            createat : user.create_at,
        }
        // jwt.sign() 메소드: 토큰 발급
        const Acess_token = jwt.sign(userInfo , process.env.ACCESS_JWT_SECRET, {
            expiresIn: '1m', // 5분
        });
        const Refresh_token = jwt.sign(userInfo , process.env.REFRESH_JWT_SECRET, {
            expiresIn: '180m', // 5분
        });
        return res.json({
            code: 200,
            message: '토큰이 발급되었습니다.',
            Acess_token,
            Refresh_token,
        });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: '서버 에러',
        });
    }
});

// 발급된 토큰을 테스트하는 라우터
router.get('/test', verifyToken, (req, res) => {
    return res.json(req.decoded);
});

module.exports = router;