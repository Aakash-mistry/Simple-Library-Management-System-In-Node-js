var books = require('../models/books');
var mongoose = require('mongoose')

var db = "mongodb://admin:abc123@ds243717.mlab.com:43717/library_management"

mongoose.connect(db)
var books = [
	new books({
		imagePath: 'https://images-na.ssl-images-amazon.com/images/I/51G3MfByofL.jpg',
		title: 'The Girl in Room 105',
		discription: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique consectetur veniam debitis illo ipsam? Laboriosam placeat tempore cumque laudantium commodi?',
		author: 'Chetan Bhagat',
		price: '11'
	}),
];

var done = 0;
for(var i=0; i < books.length; i++) {
	books[i].save(function () {
		done++;
		if(done === books.length){
			exit();
		}
	});
}

function exit() {
	mongoose.disconnect();
}
