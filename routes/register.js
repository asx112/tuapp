const express = require('express');
const md5 = require('md5');
const router = express.Router();
const user = require("../models/user");

router.get("/", function(req, res) {
    res.render("register");
})
router.post("/", function(req, res) {
    var usrInstance = new user({
        username: req.body.username,
        password: md5(req.body.password)
    });
    usrInstance.save();
    res.redirect('/login');
})
module.exports = router;