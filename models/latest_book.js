var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	imagePath: {type:String, required:true},
	title: {type: String, required: true},
	discription: {type: String, required: true},
	author: {type: String, required: true},
	price: {type: Number, required: true}
});

module.exports = mongoose.model('latest_book', schema);
