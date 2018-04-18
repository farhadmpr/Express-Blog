var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var Category = require('../models/category');
var moment = require('jalali-moment');

/* GET home page. */
router.get('/', function (req, res) {
	Post.find(function (err, posts) {
		res.render('index', {
			moment: moment,
			title: 'وبلاگ', 
			posts: posts
		});
	});
});

// POST
router.post('/', function (req, res) {
	if (!req.body.title || !req.body.text) {
		return res.redirect('/');
	}
	var post = new Post({
		title: req.body.title,
		text: req.body.text,
		date: (new Date()),
		category: req.body.category
	});
	post.save(function (err) {
		res.redirect('/');
	});
});

module.exports = router;
