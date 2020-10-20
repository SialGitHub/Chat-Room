const mongoose = require('mongoose');
const messages = require('./MessageSchema');
const message = require('./MessageSchema')
const uuid = require('uuid');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  messages: [message]
},
  {
   toJSON:{
     transform(doc, ret){
       delete ret._id
       delete ret.password
       delete ret.__v
     }
   }
  })

module.exports = mongoose.model('User', userSchema)
