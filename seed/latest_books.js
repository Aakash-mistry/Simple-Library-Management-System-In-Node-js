var latest_book = require('../models/latest_book');
var mongoose = require('mongoose')

var db = "mongodb://admin:abc123@ds243717.mlab.com:43717/library_management"

mongoose.connect(db)
var latestBook = [
	new latestBook({
	imagePath: 'https://i.pinimg.com/236x/3e/20/6b/3e206b5824c721fec49a9453b4336f09--christian-grey-james-darcy.jpg',
	title: 'Shade Of Grey',
	discription: 'Awsome Game',
	author: 'Mr.Jhon Snow',
	price: '10'
	}),
	new latestBook({
	imagePath: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4449/9781444929706.jpg',
	title: 'Five Collection',
	discription: 'Awsome Book',
	author: 'Mr.Jhon Snow',
	price: '10'
	}),
];

var done = 0;
for(var i=0; i < latestBook.length; i++) {
	latestBook[i].save(function () {
		done++;
		if(done === latestBook.length){
			exit();
		}
	});
}

function exit() {
	mongoose.disconnect();
}
