const express = require('express');
const async = require('async');
const router = express.Router();

//首页
router.get('/',(req,res)=>{
    let data = {};
    data.username = req.session.username;
    data.aid=req.session.aid;
	let sql = 'SELECT * from movies where m_status=0';
	conn.query(sql,  (err, results) => {
		if (err) {
			console.log(err)
			res.json({ r: 'db_err' });
			return;
		}
		// console.log(results)
		data.movies = results;
		console.log(data)
		res.render('front/home', data);
	});
});

//搜索页
router.get('/search',(req,res)=>{
	let data = {};
	data.username = req.session.username;
	data.aid=req.session.aid;
	
	res.render('front/search',data);

});

//单个电影页
router.get('/onemovie',(req,res)=>{
	let data = {};
	data.username = req.session.username;
	data.aid=req.session.aid;
	let m_id = req.query.m_id;
	async.waterfall([
	        function (cb) {
	            let sql = 'SELECT * FROM movies WHERE  m_id=? LIMIT 1;';
	
	            conn.query(sql, m_id, (err, result) => {
	                if (err) {
	                    console.log(err);
	                    res.json({ r: 'db_err' });
	                    return;
	                }
	                data.mo = result[0];
	                cb(null, m_id)
	            });
	        },
	        function (m_id, cb) {
	            let sql = 'SELECT * FROM bdsource WHERE  m_id=?';
	            conn.query(sql, m_id, (err, result) => {
	                if (err) {
	                    console.log(err);
	                    res.json({ r: 'db_err' });
	                    return;
	                }
	                data.bd = result;
	                cb(null, m_id)
	
	            });
	        },
	        function (m_id, cb) {
	            let sql = 'SELECT * FROM xlsource WHERE  m_id=?';
	            conn.query(sql, m_id, (err, result) => {
	                if (err) {
	                    console.log(err);
	                    res.json({ r: 'db_err' });
	                    return;
	                }
	                data.xl = result;
	                cb(null, m_id)
	            });
	        }
	    ], (err, result) => {
	        if (err) {
	            console.log(err);
	            res.json({ r: 'db_err' });
	            return;
	        }
	        res.render('front/onemovie', data);
	        // console.log(data);
	    });
	
});

//用户分享
router.get('/shore',(req,res)=>{
	let data = {};
	data.username = req.session.username;
	data.aid=req.session.aid;
	res.render('front/shore',data);
});
//用户分享资源上传
router.post('/addmovie', (req, res) => {
    let d = req.body;
    console.log(d);
    let data = {};
    data.username = req.session.username;
    async.waterfall([
        function (cb) {
            let sql = 'INSERT INTO movies VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
            let data0 = [null,
                d.m_name,
                d.m_info,
                d.m_director,
                d.m_actor,
                d.m_class,
                d.m_location,
                d.m_language,
                d.m_showtime,
                d.m_anname,
                new Date().toLocaleString(),
                null,
                d.m_score,
                '用户',
                req.session.username,
                1,
                null,
            ];
            conn.query(sql, data0, (err, result) => {
                cb(null, result.insertId);
            });
        },
        function (m_id, cb) {
            if (d.bds_name instanceof Array) {
                for (let n = 0; n < d.bds_name.length; n++) {
                    if (d.bds_name[n] != '') {
                        let sql = 'INSERT INTO bdsource VALUES (?,?,?,?,?,?,?);';
                        let data1 = [null,
                            m_id,
                            d.bds_name[n],
                            new Date().toLocaleString(),
                            0,
                            data.username,
                            0];
                        conn.query(sql, data1, (err, result) => {
                            if (err) {
                                console.log(err);
                                res.json({ r: 'db_err' });
                                return;
                            };
                            console.log(result);
                        });
                    }
                };
            } else {
                if (d.bds_name != '') {
                    let sql = 'INSERT INTO bdsource VALUES (?,?,?,?,?,?,?);';
                    let data1 = [null,
                        m_id,
                        d.bds_name,
                        new Date().toLocaleString(),
                        0,
                        data.username,
                        0];
                    conn.query(sql, data1, (err, result) => {
                    });
                }
            }
            cb(null, m_id);
        },
        function (m_id, cb) {
            if (d.xls_name instanceof Array) {
                for (let n = 0; n < d.xls_name.length; n++) {
                    if (d.xls_name[n] != '') {
                        let sql = 'INSERT INTO xlsource VALUES (?,?,?,?,?,?,?);';
                        let data1 = [null,
                            m_id,
                            d.xls_name[n],
                            new Date().toLocaleString(),
                            0,
                            data.username,
                            1];
                        conn.query(sql, data1, (err, result) => {
                            if (err) {
                                console.log(err);
                                res.json({ r: 'db_err' });
                                return;
                            };
                            console.log(result);
                        });
                    }
                };
            } else {
                if (d.xls_name != '') {
                    let sql = 'INSERT INTO xlsource VALUES (?,?,?,?,?,?,?);';
                    let data1 = [null,
                        m_id,
                        d.xls_name,
                        new Date().toLocaleString(),
                        0,
                        data.username,
                        1];
                    conn.query(sql, data1, (err, result) => {
                    });
                }
            }
            cb(null, m_id);
        }
    ], (err, result) => {
        if (err) {
            console.log(err);
            res.json({ r: 'db_err' });
            return;
        }
        res.json({ r: 'success' });
        // console.log(result);
    });

});




module.exports = router;
