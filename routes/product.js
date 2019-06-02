const express = require('express');
const path = require('path');
const fs = require('fs');
const qs = require('querystring');
const formidable = require('formidable');
const router = express.Router();
const product = require("../models/product");
const login = require("../middlewares/login");

router.get('/delete/:id', function(req, res) {
    product.findByIdAndRemove(req.params.id, function(err) {
        if (err) throw err;
        console.log("删除成功");
        fs.unlink(path.join(__dirname, "../", 'uploads', req.query.img), function(err) {
            if (err) throw err;
            console.log("图片删除成功");
        });
        res.redirect("back");
    })
})

router.get('/update/:id', login, function(req, res) {
    product.findById(req.params.id, function(err, result) {
        if (err) throw err;
        res.render("update", { data: result });
    })

})

router.post('/update/:id', function(req, res) {
    //解析数据
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = path.join(__dirname, "../", "uploads");
    form.parse(req, function(err, fields, files) {
        if (err) throw err;
        //组装数据
        var obj = {
                ...fields,
                updateAt: new Date() //更新的时间字段
            }
            //判断数据图片有没有更新
        if (files.pic.name) {
            obj.pic = "/" + path.basename(files.pic.path);
        } else { //图片没有更新  用原来的图片
        }
        product.findByIdAndUpdate(req.params.id, obj, function(err) {
            if (err) throw err;
            console.log("更新成功");
            res.redirect('/add/tu');
        })

    })
})

//路由 模块暴露
module.exports = router;