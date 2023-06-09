var express = require('express');
var router = express.Router();
const slugify = require('slugify');

router.get('/:id/:slug', function(req, res, next) {
  const id = req.params.id; // get the :id parameter from the URL
  const query = 'SELECT * FROM articles WHERE id = $1 LIMIT 1';
  const values = [id]; // use the id parameter in the query

  req.db.query(query, values, (err, result) => {
    if (err) {
      return next(err);
    }

    res.render('blog', { title: 'Blog - Brain Data', article: result.rows[0] });
  });
});


module.exports = router;
