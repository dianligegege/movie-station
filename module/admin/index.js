const express = require('express');
const async = require('async');
const router = express.Router();

router.get('/', (req, res)=>{
    let data={};
    data.username = req.session.username;
    // data.username='电里';
    res.render('admin/index',data);
});

//在线发布资源
router.get('/addmovie', (req, res)=>{
    let data={};
    data.username = req.session.username;
    res.render('admin/addmovie', data);
});
// router.post('/addmovie', (req, res)=>{
//     let d = req.body.m_uperclass;
//     let sql = 'INSERT INTO category(catename, aid, username, addtimes) VALUES (?,?,?,?)';
//     let data= [d, req.session.aid, req.session.username, new Date().toLocaleString()];
//     conn.query(sql, data, (err, result)=>{
//         if(err){
//             console.log(err);
//             res.json({r:'db_err'});
//             return ;
//         }
//         res.json({r:'success'});
//     });
// });


module.exports = router;