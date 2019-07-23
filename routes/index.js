var express = require('express')
var mongoose = require('mongoose');
var router = express.Router();
var books = require('../models/books');
var passport = require('passport')


/* GET home page.& Products */
router.get('/',notLoggedIn ,function(req, res, next) {
// books.find(function (err, docs) {
// 	var bookChunks = [];
// 	chunkSize = 3;
// 	for(var i=0; i < docs.length; i+=chunkSize) {
// 		bookChunks.push(docs.slice(i, i+ chunkSize));
// 	}
	res.render('librery/index', { title: 'LMS' //books: bookChunks
// });
});
});

router.get('/Books', isLoggedIn,function(req, res, next){
	books.find(function (err, docs) {
	var bookChunks = [];
	chunkSize = 4;
	for(var i=0; i < docs.length; i+=chunkSize) {
		bookChunks.push(docs.slice(i, i+ chunkSize));
	}
		res.render('browse-book/Book', {books: bookChunks});
	});
});

router.get('/bookInfo/:id', isLoggedIn,function(req, res, next){
	books.findOne({_id : req.params.id},function(err,books){
		if(err){
		  res.render('error')
		}
		if(books==null){
		  res.render('error')
		}else{
		 	var message = req.flash('success')
			res.render('browse-book/bookInfo',{message:message,books:books})
		}
	  })
});

// User Routes
router.get('/register', notLoggedIn,(req,res,next)=>{
var message = req.flash('error')
res.render('user/register',{messages:message})
})

router.post('/register', passport.authenticate('local-signup',{
failureRedirect: '/register',
failureFlash: true,
}, {title: 'Hello'}))

router.get('/signin',(req,res,next)=>{
let message = req.flash('error')
res.render('user/login',{messages:message})
})

router.post('/signin',passport.authenticate('local-signin',{
successRedirect: '/Books',
failureRedirect: '/signin',
failureFlash: true,
}))

router.get('/logout',(req,res,next)=>{
req.logout();
res.redirect('/')
})


router.get('/profile',isLoggedIn,(req,res,next)=>{
var message = req.flash('success')
res.render('user/profile',{profile:req.user,message:message})
})

router.post('/profile',notLoggedIn,(req,res,next)=>{
if(err){
	console.log(err);
	res.redirect('back');
	}else{
	User.findOne({_id : req.user},function(err,user){
		if(err){
		req.flash('success','Something Went Wrong.. Please Try Again Later');
		}else{
		user.firstname = req.body.firstname
		user.lastname = req.body.lastname
		user.save(err=>{
			if(err){
			res.redirect('back')
			}else{
			req.flash('success','Profile Updated Successfully');
			res.redirect('/profile');
			}
		})
		}
	})
	}
})

router.post('/profile',(req,res,next)=>{
upload(req,res,(err)=>{
	if(err){
	console.log(err);
	res.redirect('back');
	}else{
	User.findOne({_id : req.user},function(err,user){
		if(err){
		req.flash('success','Something Went Wrong.. Please Try Again Later');
		}else{
		user.firstname = req.body.firstname
		user.lastname = req.body.lastname
		user.profile = `/asset/image/${req.file.filename}`
		user.save(err=>{
			if(err){
			res.redirect('back')
			}else{
			req.flash('success','Profile Updated Successfully');
			res.redirect('/profile');
			}
		})
		}
	})
	}
})
})

router.get('/search', function (req, res, next) {
	books.find({name: req.title}, function () {
		if(err) {
			req.flash('failure', 'No Records Found...')
		}
	})
	res.render('browse-book/Book', {result: resultChunks})
})


module.exports = router;
// To protect pages use isLoggedIn
function isLoggedIn(req,res,next){
if(req.isAuthenticated()){
	return next()
}
res.redirect('/signin')
}
// ToUn protect pages use isLoggedIn
function notLoggedIn(req,res,next){
if(!req.isAuthenticated()){
	return next()
}
res.redirect('/')
}
