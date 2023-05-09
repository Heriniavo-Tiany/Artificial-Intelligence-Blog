var express = require('express');
var router = express.Router();
const slugify = require('slugify');

router.get('/', function(req, res, next) {
  const query = 'SELECT * FROM articles';

  req.db.query(query, (err, result) => {
    if (err) {
      return next(err);
    }

    const articles = result.rows.map(row => ({
      ...row,
      slug: slugify(row.title, { lower: true, strict: true }),
    }));

    res.render('index', {
      title: 'Accueil - Brain Data',
      articles,
      slugify,
    });
  });
});


module.exports = router;
