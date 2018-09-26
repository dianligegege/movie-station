const express = require('express');
const router = express.Router();
//管理员登录  各种路由处理
router.get('/', (req, res)=>{
    res.render('logsignup/login');
});
 
//管理员登录验证


router.post('/', (req, res)=>{
    let d = req.body;
    // console.log(req.body)
    // //首先验证验证码
    // console.log(d.coder)
    console.log(req.session)
    if(d.coder.toLowerCase() != req.session.coder.toLowerCase()){
        res.json({r:'coder_err'});
        return ;
    }
    //进行数据验证
    let sql = 'SELECT * FROM admin WHERE a_status = 1 AND a_name = ?';
    conn.query(sql, d.a_name, (err, result)=>{
        //账号是不是存在
        // console.log(result)
        if(!result.length){
            res.json({a:'u_not'});
            return ;
        }
        //判断密码是否正确
        if(d.a_password!= result[0].a_password){
            res.json({a:'p_err'});
            return ;
        }
        //登录成功
        //保存session信息
        req.session.aid = result[0].a_id;
        req.session.username = result[0].a_name;
        //更新状态
        console.log(result[0])
        let sql = 'UPDATE admin SET  a_lasttime = ? WHERE a_name = ?';
        conn.query(sql, [new Date().toLocaleString(), result[0].a_name], (err, result)=>{
            res.json({a:'ok'});
        });
        
    });
});
//用户登录验证
router.post('/1', (req, res)=>{
    let d = req.body;
    console.log(req.body)
    // //首先验证验证码
    // console.log(d.coder)
    // console.log(req.session)
    if(d.coder.toLowerCase() != req.session.coder.toLowerCase()){
        res.json({r:'coder_err'});
        return ;
    }
    //进行数据验证
    let sql = 'SELECT * FROM user WHERE u_status = 1 AND u_name = ?';
    conn.query(sql, d.a_name, (err, result)=>{
        //账号是不是存在
        console.log(result)
        if(!result.length){
            res.json({r:'u_not'});
            return ;
        }
        //判断密码是否正确
        if(d.a_password!= result[0].u_password){
            res.json({r:'p_err'});
            return ;
        }
        //登录成功
        //保存session信息
        req.session.aid = result[0].u_id;
        req.session.username = result[0].u_name;
        // req.session.header = result[0].u_header;
        //更新状态
        let sql = 'UPDATE user SET  u_lasttime = ? WHERE u_name = ?';
        console.log(result[0].u_name)
        conn.query(sql, [new Date().toLocaleString(), result[0].u_name], (err, result)=>{
            res.json({u:'ok'});
        });
        
    });
});

// router.post('/1',(req,res)=>{
// res.send("666")
// })
module.exports = router;