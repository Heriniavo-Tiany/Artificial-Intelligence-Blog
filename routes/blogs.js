var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const query = 'SELECT * FROM articles WHERE id = $1 LIMIT 1';
  const values = [2];

  req.db.query(query, values, (err, result) => {
    if (err) {
      return next(err);
    }

    res.render('blog', { title: 'Intelligence Artificielle - Blog', article: result.rows[0] });
  });
});

module.exports = router;
