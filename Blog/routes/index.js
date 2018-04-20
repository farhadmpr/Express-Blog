var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var Category = require('../models/category');
var moment = require('jalali-moment');

/* GET home page. */
router.get('/', function (req, res) {
    let search = {};

    if (req.query.search) {
        search = { title: { $regex: '.*' + req.query.search + '.*' } }
    }

    Post.find(search)
        .populate('category')
        .exec(function (err, posts) {
            res.render('index', {
                moment: moment,
                title: 'وبلاگ',
                posts: posts
            });
        })
});

module.exports = router;
