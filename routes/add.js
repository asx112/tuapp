const express = require('express');
const path = require('path');
const formidable = require('formidable');
const router = express.Router();
const product = require("../models/product");
const login = require("../middlewares/login");

router.get("/", login, function(req, res) {
    res.render("add");
})
router.post('/', function(req, res) {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = path.join(__dirname, "../", "uploads");
    form.parse(req, function(err, fields, files) {
        if (err) throw err;
        var obj = {
            ...fields,
            pic: "/" + path.basename(files.pic.path)
        };
        var productIstance = new product(obj);
        productIstance.save();
        res.redirect('/add/tu');
    })
})
router.get('/tu', function(req, res) {
    product.find({}, function(err, results) {
        if (err) throw err;

        res.render('tu', { arr: results });
    })
    console.log(req.cookies);
})

module.exports = router;