const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const saltRound = 10
var userSchema = new Schema({
  email: {type: String, required: true},
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  password: {type: String, required: true}
})

userSchema.methods.encryptPassoword = function(password){
  return password
}

userSchema.methods = function(password){
  return password
}

module.exports = mongoose.model('user',userSchema);