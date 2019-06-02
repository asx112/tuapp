const express = require('express');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const moment = require('moment');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();
app.locals.moment = moment;

//静态资源中间件
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(bodyParser());
app.use(cookieParser('123456'));
app.use(session({
    secret: "123456",
    name: "sessionId",
    cookie: { maxAge: 60 * 1000 }, //生效时间（时长）
    rolling: true, //设置（重置、更新）生效时长的初始时间
    store: new MongoStore({
        url: "mongodb://localhost:27017/app" //session保存到指定的数据库
    })
}));

//链接数据库
mongoose.connect("mongodb://localhost/app", { useNewUrlParser: true, useFindAndModify: false });

const con = mongoose.connection;
con.on('open', function() {
    console.log("数据库链接成功");
})


app.get('/loginout', function(req, res) {
    req.session.destroy(function(err) {
        if (err) throw err;
        console.log("退出成功");
    })
    res.redirect('/login');
})

//模板引擎设置
app.set('views', path.join(__dirname, "views"));
//模板类型 ejs
app.set('view engine', 'ejs');


app.use("/login", require('./routes/login.js'));
app.use("/register", require('./routes/register.js'));
app.use("/add", require('./routes/add.js'));
app.use("/product", require('./routes/product.js'));

app.listen(4000);