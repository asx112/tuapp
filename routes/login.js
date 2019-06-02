const express = require('express');
const md5 = require('md5');
const router = express.Router();
const user = require("../models/user");
router.get("/", function(req, res) {
    res.render("login");
})
router.post("/", function(req, res) {
    console.log(req.body);

    user.find({
        username: req.body.username,
        password: md5(req.body.password)
    }, function(err, result) {
        if (err) throw err;
        if (result.length) { //匹配成功
            req.session.username = req.body.username;
            req.session.password = md5(req.body.password);
            // res.end("1");
            res.redirect('/add/tu');
        } else { //重新登录
            // res.end("1234");
            res.redirect("/login");
        }
    })

})
module.exports = router;