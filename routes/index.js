var express = require('express');
var router = express.Router();

const sentimenController = require('../controllers').sentimen;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'API Sentimen Analysis' });
});

/* Sentiment Router*/
router.get('/api/sentimen',sentimenController.list);

module.exports = router;
