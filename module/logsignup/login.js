const express = require('express');
const router = express.Router();
//管理员登录  各种路由处理
router.get('/', (req, res)=>{
    // res.render('login');
    res.send('管理员登录')
});




module.exports = router;