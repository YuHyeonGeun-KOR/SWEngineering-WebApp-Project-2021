const express = require('express');
const { use } = require('.');
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const db = require('../models/index')
require('dotenv').config();

/* GET register method. */
router.get('/', function (req, res, next) {
    res.render('register', { title: "RECIPES" });
})


/* POST register method. */
router.post('/', async(req, res) => {
    let { userEmail, nickname, password, passwordCheck } = req.body;

    // 빈값이 왔을 때 메시지
    if (
        userEmail === "" ||
        nickname === "" ||
        password === "" ||
        passwordCheck === ""
    ) {
        return res.json({ registerSuccess: false, message: "정보를 입력하세요" });
    }

    if (password !== passwordCheck){
        return res.json({
            registerSuccess: false,
            message: "입력하신 비밀번호가 일치하지 않습니다.",
        });
    }

    const sameEmailChecker = await db.User.findOne({ userEmail: userEmail });
    if (sameEmailChecker !== null){
        return res.json({
            registerSuccess : false,
            message : "이미 등록된 이메일입니다.",
        });
    }

    const sameNickChecker = await db.User.findOne({ nickname : nickname});
    if (sameNickChecker !== null){
        return res.json({
            registerSuccess : false,
            message : "이미 등록된 별명입니다.",
        })
    }

    bcrypt.genSalt(saltRounds, (err, salt) => {
        // 솔트 생성 실패시
        if (err)
          return res.status(500).json({
            registerSuccess: false,
            message: "해쉬화 하는 과정에서 오류가 발생했습니다.",
          });
        // salt 생성에 성공시 hash 진행
    
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err)
                return res.status(500).json({
                registerSuccess: false,
                message: "비밀번호 해쉬화에 실패했습니다.",
                });
        
            // 비밀번호를 해쉬된 값으로 대체합니다.
            password = hash;
        
            const user = await db.User.create({
                email : userEmail,
                nickname,
                password : password,
            });
                
            user.save((err) => {
                if (err) return res.json({ registerSuccess: fasle, message: err });
            });
            return res.json({ registerSuccess: true });
            });
    });
    
    
});

module.exports = router;
