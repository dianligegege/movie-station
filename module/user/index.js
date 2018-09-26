//用户后端js
const express = require('express');
const async = require('async');
const multer = require('multer');
const router = express.Router();


//用户个人信息设置
router.get('/', (req, res) => {
    let data = {};
    data.username = req.session.username;
    // data.username='电里';
    res.render('user/index', data);
});
router.get('/collect', (req, res) => {
    let data = {};
    data.username = req.session.username;
    console.log(req.session.aid)
    // data.username='电里';
    // res.render('user/collect', data);
    async.waterfall([
function(cb){
    let sql = "select *from collection where u_id=? "
    conn.query(sql,req.session.aid,(err,result)=>{
        cb(null,result[0].m_id)
        console.log(result)
    })
},
function(m_id,callback){
    let sql ="select *from movies where m_id=?"
    conn.query(sql,m_id,(err,result)=>{
        // console.log(result)
        callback(null,result)
    })
}],(err,result)=>{
    if (err) {
        console.log(err);
        res.json({ r: 'db_err' });
        return ;
    }
    // console.log(result)
    data.catelist = result[0];
	console.log(data)
    // res.json({ r: 'success' });
    res.render('user/collect', data);
}

)
});
router.post("/1",(req,res)=>{
    let a=req.body;
    console.log(req.body);
    console.log(req.session);
    let sql = 'SELECT * FROM user WHERE u_status = 1 AND u_name = ?';
    conn.query(sql, a.u_name, (err, result)=>{
        //账号是不是存在
        // console.log(result)
        if(result.length){
            res.json({a:'u_not'});
            return ;
        }
        sql="update user set u_head=?, u_name=?,u_password=?,u_age=?,u_sex=?,u_tel=?,u_info=?where u_id=?"
        conn.query(sql,[a.u_header,a.u_name,a.u_password,a.u_age,a.u_sex,a.u_tel,a.u_info,req.session.aid],(err,result)=>{
            if(err){
                console.log("err")
            }
            else{
                res.json({a:'ok'})
            }
         
        })
    })

})

router.get("/talk", (req, res) => {
    console.log(66)
    let data = {};
    data.username = req.session.username;
    // data.username='电里';
    // res.render('user/collect', data);
    let sql = 'SELECT * FROM talk WHERE t_status = 1 AND u_id = ?';
    conn.query(sql,req.session.aid,(err,result)=>{
        console.log(result)
        data.talklist = result;
        console.log(data)
        // res.json({ r: 'success' });
        res.render('user/talk', data);
    })
});






module.exports = router;