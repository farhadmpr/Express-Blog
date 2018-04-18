var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var Category = require('../models/category');
var moment = require('jalali-moment');

router.get('/', function (req, res) {
	Post.find()
	.populate('category')
	.exec(function (err, posts) {
		Category.find(function (err, cats) {
			res.render('posts/index', {
				moment: moment,
				title: 'وبلاگ', 
				posts: posts,
				cats: cats
			});
		});
	});
});

router.post('/', function (req, res) {
	if (!req.body.title || !req.body.text) {
		return res.redirect('/post');
	}
	var post = new Post({
		title: req.body.title,
		text: req.body.text,
		date: (new Date()),
		category: req.body.category
	});
	post.save(function (err) {
		res.redirect('/post');
	});
});

module.exports = router;
