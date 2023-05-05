var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Intelligence Artificielle - Home' });
  const query = 'SELECT * FROM articles';
  req.db.query(query, (err, result) => {
    if (err) {
      return next(err);
    }
    res.render('index', {  title: 'Intelligence Artificielle - Home', articles: result.rows });
  });
});


module.exports = router;
