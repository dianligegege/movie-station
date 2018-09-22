const express = require('express');
const async = require('async');
const router = express.Router();

router.get('/', (req, res) => {
    let data = {};
    data.username = req.session.username;
    // data.username='电里';
    res.render('admin/index', data);
});

//在线发布资源
router.get('/addmovie', (req, res) => {
    let data = {};
    data.username = req.session.username;
    res.render('admin/addmovie', data);
});
router.post('/addmovie', (req, res) => {
    let d = req.body;
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
                '管理员',
                req.session.username,
                0,
                null,
            ];
            conn.query(sql, data0, (err, result) => {
                cb(null, result.insertId);
            });
        },
        function (m_id, cb) {
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
                    cb(null, m_id);
                });
            } else {
                cb(null, m_id);
            }
        },
        function (m_id, cb) {
            if (d.xls_name != '') {
                let sql = 'INSERT INTO xlsource VALUES (?,?,?,?,?,?,?);';
                let data1 = [null,
                    m_id,
                    d.xls_name,
                    new Date().toLocaleString(),
                    0,
                    data.username,
                    0];
                conn.query(sql, data1, (err, result) => {
                    cb(null, result);
                });
            } else {
                cb(null, m_id);
            }
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

//电影资源管理
router.get('/movies', (req, res) => {
    let d = req.body;
    let data = {};
    data.username = req.session.username;

    //当前页数
    let pagenum = 5;
    data.pagenum = pagenum;

    let page = req.query.page ? req.query.page : 1;
    data.page = page;
    async.series({
        count: function (callback) {
            let sql = 'SELECT COUNT(*) AS nums FROM movies WHERE m_status = 0';
            conn.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    res.json({ r: 'db_err' });
                    return;
                }
                // console.log(result);
                callback(null, result[0].nums);
            });
        },
        movies: function (callback) {
            //查询分类信息
            let sql = 'SELECT m.m_id,m.m_name,m.m_language,m.m_score,m.m_uperclass,m.m_upername,m.m_tag,m.m_class FROM movies AS m  WHERE (m.m_status = 0) LIMIT ?, ?';
            conn.query(sql, [pagenum * (page - 1), pagenum], (err, results) => {
                if (err) {
                    console.log(err)
                    res.json({ r: 'db_err' });
                    return;
                }
                // console.log(results)
                callback(null, results);
            });
        }
    }, (err, results) => {
        if (err) {
            console.log(err);
            res.json({ r: 'db_err' });
            return;
        }
        data.count = results.count;
        data.movies = results.movies;
        res.render('admin/movies', data);
        console.log(data);
    });

});

//电影资源删除
router.get('/delmovie', (req, res) => {
    let sql = 'UPDATE movies SET m_status = 1 WHERE m_id = ? LIMIT 1';
    conn.query(sql, req.query.m_id, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ r: 'db_err' });
            return;
        }
        res.json({ r: 'success' });
    });
    console.log(req.query)
});

//修改电影信息
router.get('/updatemo', (req, res) => {
    let data = {};
    data.username = req.session.username;
    //获取原始信息
    let m_id = req.query.m_id;
    if (!m_id) {
        res.send('请选择你要修改的分类');
        return;
    }

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
        res.render('admin/updatemo', data);
        console.log(data);
    });



});
router.post('/updatemo', (req, res) => {
    let d = req.body;
    let sql = 'UPDATE movies SET m_name=?,m_info=?,m_director=?, m_actor=?,m_class=?,m_location=?,m_language=?, m_showtime=?,m_anname=?,m_update=?,m_score=? WHERE m_id = ?';
    let data0 = [
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
        d.m_score,
        d.m_id
    ]
    conn.query(sql, data0, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ r: 'db_err' });
            return;
        }
        res.json({ r: 'success' });
    });
});

module.exports = router;