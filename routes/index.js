var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Make a screenshot',
    screenWidth: 960,
    url: ''
  });
});

module.exports = router;
