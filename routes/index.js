var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* GET portfolio-details page. */
router.get('/portfolio-details', (req, res, next)=> {
  res.render('portfolio_details');
});

module.exports = router;
