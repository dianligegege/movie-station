const express = require('express');
const router = express.Router();
//用户注册  各种路由处理
router.get('/', (req, res)=>{
    res.render('logsignup/signup')
});
//注册验证
router.post('/', (req, res)=>{
    let d = req.body;
    console.log(req.body)
    // //首先验证验证码
    // console.log(d.coder)
    console.log(req.session)
    if(d.coder.toLowerCase() != req.session.coder.toLowerCase()){
        res.json({r:'coder_err'});
        return ;
    }
    //进行数据输入
    let sql = 'SELECT *from user where u_name=?';
    conn.query(sql, d.u_name, (err, result)=>{
        // //账号是不是存在
       console.log(result)
        if(!result.length){
            let sql = 'INSERT into user (u_name,u_tel,u_password) VALUES (?,?,?)';
            conn.query(sql,[ d.u_name,d.u_tel,d.u_password], (err, result)=>{
            res.json({r:"ok"})
            })
        }
        else{
            res.json({r:"error"})
        }
    });

});






module.exports = router;