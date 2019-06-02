//定义上传商品字段
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    pic: String,
    description: String,
    updateAt: { type: Date, default: new Date() }
});

//指定数据库中的存储集合
const product = mongoose.model("product", productSchema)

//暴露模块
module.exports = product;