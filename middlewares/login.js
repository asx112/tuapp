//判断登录权限
module.exports = function(req, res, next) {
    //用session设置权限
    if (req.session.username && req.session.password) {
        //  登录成功
        next();
    } else {
        // 没有登录成功
        res.redirect("/login");
    }



}