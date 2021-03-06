﻿var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var Category = require('../models/category');
var moment = require('jalali-moment');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/login');
}

router.get('/', isAuthenticated, function (req, res) {
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

router.post('/', isAuthenticated, function (req, res) {
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

router.get('/delete/:id', isAuthenticated, function (req, res) {
	Post.findByIdAndRemove(req.params.id, (err, post) => {
		if (err) return res.status(500).send(err);
		res.redirect('/post');
	});
});

router.get('/edit/:id', isAuthenticated, function (req, res) {
	Post.findOne({_id: req.params.id})
		.populate('category')
		.exec(function (err, post) {
			if (err) return res.status(500).send(err);
			Category.find(function (err, cats) {
				res.render('posts/edit', { post: post, cats: cats });
			});
		});
});

router.post('/edit', isAuthenticated, function (req, res) {
	if (!req.body.id && !req.body.title) {
		return res.redirect('/post');
	}
	Post.findById(req.body.id, function(err, post){
		if (err) return res.status(500).send(err);
		post.category=req.body.category
		post.title=req.body.title;
		post.text=req.body.text;
		Post.findByIdAndUpdate(
			req.body.id,
			post,
			function(err, post){
				if (err) return res.status(500).send(err);
				res.redirect('/post');
			}
		);
	});
});

module.exports = router;
