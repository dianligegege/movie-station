//用户后端js
const express = require('express');
const async = require('async');
const router = express.Router();

//用户个人中心首页
router.get('/', (req, res) => {
    let data = {};
    data.username = req.session.username;
    // data.username='电里';
    res.render('user/index', data);
});

module.exports = router;