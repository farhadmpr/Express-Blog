var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = mongoose.Schema({
	title: { type: String, required: true },
	text: { type: String, required: true },
	date: { type: Date, required: true },
	category: { type: Schema.Types.ObjectId, ref: 'category'}
});

var post = mongoose.model('post', postSchema);

module.exports = post;