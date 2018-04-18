var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
	title: { type: String, required: true },
	//posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}]
});

var category = mongoose.model('category', categorySchema);

module.exports = category;