var express = require('express');
var router = express.Router();
const slugify = require('slugify');

router.get('/', function(req, res, next) {
  const pageSize = 10; // Number of articles per page
  const currentPage = parseInt(req.query.page) || 1; // Current page number, defaults to 1 if not provided

  // Query to get the articles for the current page
  const query = `SELECT * FROM articles LIMIT ${pageSize} OFFSET ${(currentPage - 1) * pageSize}`;

  req.db.query(query, (err, result) => {
    if (err) {
      return next(err);
    }

    const articles = result.rows.map(row => ({
      ...row,
      slug: slugify(row.title, { lower: true, strict: true }),
    }));

    const hasMore = articles.length === pageSize;
    const totalPages = hasMore ? currentPage + 1 : currentPage;
    res.render('index', {
      title: 'Accueil - Brain Data',
      articles,
      slugify,
      currentPage,
      totalPages,
      hasMore,
      pageSize
    });
  });
});


module.exports = router;
