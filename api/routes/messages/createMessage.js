import {body} from "express-validator";

const express = require('express')

const RequestHandler = require('../../utils/requestHandler')

const User = require('../../models/UserSchema')
const Message = require('../../models/MessageSchema')

const router = express.Router()

router.post('users/messages/create',[
  body('text')
    .notEmpty()
]), async (req, res ) => {
  try {
    const message = new Message({
      text
    })
  } catch (error) {
    console.log(error)
  }
}

export { router as createMessageRouter }
