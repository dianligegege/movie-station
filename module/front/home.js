const express = require('express');
const async = require('async');
const router = express.Router();

//首页
router.get('/',(req,res)=>{
    let data = {};
    data.username = req.session.username;
    data.aid=req.session.aid;
    res.render('front/home',data);
});

router.get('/search',(req,res)=>{
	let data = {};
	data.username = req.session.username;
	data.aid=req.session.aid;
	res.render('front/search',data);

})


module.exports = router;
