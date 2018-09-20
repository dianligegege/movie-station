/*各种模块 */
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
global.md5 = require('md5');
const svgCaptcha = require('svg-captcha');
const multer = require('multer');
/* 模块引用部分结束位置 */
const app = express();
//定义各种参数
let hostname = 'localhost:81/';
let secret = 'sports.app.myweb.www';
// 启用中间件
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(secret));
//模板引擎设置
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', './views');
//数据库连接
global.conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'880508',
    port:3306,
    database:'moviestation'
});
conn.connect();
//启用session
app.use(session({
    secret:secret,
    resave:true,
    saveUninitialized: true,
    cookie: {maxAge:30*24*3600*1000}
}));






//子路由
//登录
app.use('/logsignup/login',require('./module/logsignup/login'));
//注册
app.use('/logsignup/signup',require('./module/logsignup/signup'));

//管理员
//

//静态资源托管
app.use('/uploads', express.static('uploads'));
app.use(express.static('static'));
//端口
app.listen(81,()=>{
    console.log('端口：81');
})