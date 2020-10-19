const mongoose = require('mongoose');
const User = require('./UserSchema');

const messageSchema = new mongoose.Schema({
    // authorEmail: {
    //   type: User,
    // },
    text: String
},
  {
    toJSON:{
      transform(doc, ret) {
        delete ret._id
        delete ret.__v
      }
    }
})

module.exports = mongoose.model('Message', messageSchema)
