var express = require('express')
var router = express.Router();
// var multer = require('multer');

// var storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, '/my-uploads')
// 	},
// 	filename : function (req, res, next) {
// 		cb(null, file.fieldname + '-' + Date.now())
// 	}
// });

var uploads = multer({ storage: storage }).single('image');

/* GET home page.& Products */
router.get('/adminislive' ,function(req, res, next) {
	res.render('administrator/index');
});

router.get('/whoisconnected', function (req, res, next){
	res.render('administrator/users/users');
});

router.get('/ourBooks', function(req, res, next){
	res.render('administrator/books/books');
});

router.get('/addnewbook', function(req, res, next){
	res.render('administrator/books/addbook');
});

// router.post('/addnewbook', function (req, res, next) {
// 	uploads(req, res, function(err){
// 		if (err) {
// 			console.log('error');
// 		} else {
// 			return uploads();
// 			res.render('administrator/books/addbook');
// 		}
// 	});
// });

router.get('/siteManagment', function(req, res, next){
	res.render('administrator/management/management');
})

module.exports = router;
