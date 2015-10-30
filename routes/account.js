var express = require('express');
var router = express.Router();
var User = require('./../database/User.js');
var UserRole = require('./../database/UserRole.js');
var urlencode = require('urlencode');
var urldecode = require('urldecode');
var md5 = require('md5');

router.get('/login', csrfProtection, function (req, res) {
    res.clearCookie('sessionId', {});
    var returnUrl = '%2f';
    if (req.query.returnUrl)
        returnUrl = urlencode(req.query.returnUrl);
    res.render('./account/login', {title: '登录页', csrfToken: req.csrfToken(), returnUrl: returnUrl});
});
router.post('/login', parseForm, csrfProtection, function (req, res, next) {
    var returnUrl = '/';
    if (req.query.returnUrl)
        returnUrl = req.query.returnUrl;
    User.findOne({
        userName: req.body.userName,
        password: md5(req.body.pwd)
    }, function (uerr, uquery) {
        if (uquery) {
            res.cookie("sessionId", uquery._id, {expires: new Date(Date.now() + 2 * 60 * 60 * 10000)});
            res.redirect(returnUrl);
        } else {
            User.findOne({
                email: req.body.email,
                password: md5(req.body.pwd)
            }, function (eerr, equery) {
                if (equery) {
                    res.cookie("sessionId", equery._id, {expires: new Date(Date.now() + 2 * 60 * 60 * 10000)});
                    res.redirect(returnUrl);
                } else {
                    res.render('./account/login', {
                        title: '登录页',
                        csrfToken: req.csrfToken(),
                        errorMessage: "用户名或密码错误",
                        returnUrl: urlencode(returnUrl)
                    });
                }
            });
        }
    });
});

router.get('/register', csrfProtection, function (req, res) {
    res.render('./account/register', {title: '注册页', csrfToken: req.csrfToken()});
});

router.post('/register', parseForm, csrfProtection, function (req, res, next) {
    var user = new User();
    user.userName = req.body.name;
    user.email = req.body.email;
    user.password = md5(req.body.pwd);
    user.createTime = Date();
    user.loginTime = Date();
    user.gender = true;
    UserRole.findOne({roleName: 'user'}, function (err, result) {
        user.role = result;
        user.save(function (err) {
            if (err) {
                res.render("./account/register", {title: '注册页', errorMessage: err});
            } else {
                res.cookie('sessionId', user._id);
                res.redirect('/');
            }
        });
    });
});

router.get('/pwd', function (req, res, next) {

});

router.get('/pwdcallback', function (req, res, next) {

});

router.get('/logout', function (req, res, next) {
    res.clearCookie('sessionId');
});

module.exports = router;