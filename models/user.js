//用户登录信息
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
})

module.exports = mongoose.model("user", userSchema);