const mongoose = require('mongoose');
const express = require('express');  
const bcrypt = require('bcrypt')
const app = express();


const userSchema = new mongoose.Schema({
    username: String, 
    password: String
  });    
  
userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  };
   
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
 
userSchema.methods.verifyPassword = async function(password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (err) {
      throw err;s
    }
  };
 
const User = mongoose.model('User', userSchema);

module.exports = User;       
