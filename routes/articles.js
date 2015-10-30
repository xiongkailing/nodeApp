var express = require('express');
var router = express.Router();
var authorize = require('./../unity/authorize.js');

router.use(authorize);

router.get('/', function (req, res, next) {
    res.send('articles in here').end();
});

module.exports = router;