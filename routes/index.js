var express = require('express');
var router = express.Router();
const slugify = require('slugify');

router.get('/', function(req, res, next) {
  const pageSize = 10; // Number of articles per page
  const currentPage = parseInt(req.query.page) || 1; // Current page number, defaults to 1 if not provided

  // Query to get the articles for the current page
  const query = `SELECT * FROM articles LIMIT ${pageSize} OFFSET ${(currentPage - 1) * pageSize}`;

  // Query to get the total number of articles
  const countQuery = 'SELECT COUNT(*) FROM articles';

  req.db.query(query, (err, result) => {
    if (err) {
      return next(err);
    }

    const articles = result.rows.map(row => ({
      ...row,
      slug: slugify(row.title, { lower: true, strict: true }),
    }));

    // Get the total number of articles from the countQuery
    req.db.query(countQuery, (err, countResult) => {
      if (err) {
        return next(err);
      }

      const totalCount = parseInt(countResult.rows[0].count);
      const totalPages = Math.ceil(totalCount / pageSize);

      res.render('index', {
        title: 'Accueil - Brain Data',
        articles,
        slugify,
        currentPage,
        totalPages,
      });
    });
  });
});


module.exports = router;
