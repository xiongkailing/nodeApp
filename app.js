var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var session = require('express-session');
var csrf = require('csurf');
var swig = require('swig');

//csrf 配置
global.csrfProtection = csrf({cookie: true});
global.parseForm = bodyParser.urlencoded({extended: false});
//mongodb
global.db = mongoose.createConnection('mongodb://10.1.5.110/mongooseDemo');

var routes = require('./routes/index');
var users = require('./routes/users');
var account = require('./routes/account');
var articles = require('./routes/articles');
var app = express();

// view engine setup
app.engine('.html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', false);
swig.setDefaults({cache: false});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/account', account);
app.use('/article', articles);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    next(err);
})
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            title: 'error page',
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        title: 'error page',
        message: err.message,
        error: {}
    });
});


module.exports = app;
