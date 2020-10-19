const mongoose = require('mongoose');
const message = require('./MessageSchema')
const user = require('./UserSchema')

const messagesSchema = new mongoose.Schema({
  author:{user},
  messages:[
    message
  ]
})

module.exports = mongoose.model('messages', messagesSchema)
