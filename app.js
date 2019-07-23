var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var app = express();
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');


var indexRouter = require('./routes/index'),Strategy;
var adminRouter = require('./routes/administrator');

mongoose.connect("mongodb://admin:abc123@ds243717.mlab.com:43717/library_management", function (err) {
  if(!err){
    console.log('connected to the Database')
  }
})

require ("./config/passport")

// view engine setup
app.engine('.hbs', expressHbs( {defaultLayout: 'layout', extname: '.hbs'} ));
app.set('view engine', 'hbs');

app.use(session({
  secret: 'Securityes',
  resave: false,
  saveUninitialized: true,
}))

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(function (req,res,next) {
    res.locals.login = req.isAuthenticated();
    if(req.isAuthenticated()){
      if(req.user.email){
        res.locals.user = req.user.email
      }else{
        res.locals.user = req.user.username
      }
    }
    res.locals.session = req.session;
    next();
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/admin', adminRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
