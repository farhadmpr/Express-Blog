var express = require('express');
var router = express.Router();
var Category = require('../models/category');

/* GET home page. */
router.get('/', function (req, res) {
	Category.find(function (err, cats) {
		res.render('category', {
			cats: cats
		});
	});
});

// POST
router.post('/', function (req, res) {
	if (!req.body.title) {
		return res.redirect('/category');
	}
	var cat = new Category({
		title: req.body.title
	});
	cat.save(function (err) {
		res.redirect('/category');
	});
});

module.exports = router;
