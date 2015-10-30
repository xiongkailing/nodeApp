var User = require("./../database/User.js");
var urlencode=require('urlencode');

module.exports = function (req, res, next) {
    if (req.cookies.sessionId) {
        User.findById(req.cookies.sessionId, function (err, result) {
            if (result) {
                next();
            } else {
                console.log('无访问权限');
                res.render('unauth', {title: '访问权限' + req.cookies.sessionId, returnUrl: urlencode(req.originalUrl)});
            }
        });
    } else {
        res.redirect('/account/login?returnUrl=' + urlencode(req.originalUrl));
    }
}