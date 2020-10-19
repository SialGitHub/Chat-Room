const mongoose = require('mongoose');
const User = require('./UserSchema');
const uuid = require('uuid');

const messageSchema = new mongoose.Schema({
    id:{
      type: uuid
    },
    authorEmail: {
      type: User,
    },
    text: {
      type: String,
      required: true
    }
},
  {
    timestamps: true
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
