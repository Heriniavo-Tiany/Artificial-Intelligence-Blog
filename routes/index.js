var express = require('express');
var router = express.Router();
const slugify = require('slugify');

router.get('/', function(req, res, next) {
  const query = 'SELECT * FROM articles ORDER BY created_at DESC';

  req.db.query(query, (err, result) => {
    if (err) {
      return next(err);
    }

    const articles = result.rows.map(row => ({
      ...row,
      slug: slugify(row.title, { lower: true, strict: true }),
    }));

    res.render('index', {
      title: 'Intelligence Artificielle - Accueil',
      articles,
      slugify,
    });
  });
});


module.exports = router;
