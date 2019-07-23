const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')

passport.serializeUser((user,done)=>{
    done(null,user.id)
  })

  passport.deserializeUser((id,done)=>{
    User.findById(id,function(err,user){
      done(err,user)
    })
  })

  passport.use('local-signup',new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true,
  },function(req,email,password,done, next){
    User.findOne({'email':req.body.email},function(err,user){
      if(err){
        return done(err)
      }
      if(user){
        return done(null,false,{message:'User is Already Exists'})
      }
      password = req.body.password
      confirmPassword = req.body.confrimpassword
      if(password==confirmPassword){
        return done(null,false,{message:'Match Password Of Both Password Field'})
      }
      var user = User();
      user.email = req.body.email
      user.firstname = req.body.firstname
      user.lastname = req.body.lastname
      user.password = req.body.password
      user.save(function(err,result){
        if(err){
          return done(err)
        }else{
          return done(null,user)
        }
      })
    })
  }))

  passport.use('local-signin',new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true,
  },function(req,email,password,done){
    User.findOne({'email':email},function(err,user){
        password = req.body.password
        confirmPassword = req.body.confirmPassword
      if(err){
        return done(err)
      }
      if(!user){
        return done(null,false,{message:'No User Found Register And Try Again...'})
      }
      if(user.password!==password){
        return done(null,false,{message:'Ops...Your Password Is Wrong...!!!'})
      }else{
        return done(null,user)
      }
    })
  }))
