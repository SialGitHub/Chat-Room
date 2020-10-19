import {body} from "express-validator";

const express = require('express')

const RequestHandler = require('../../utils/requestHandler')

const User = require('../../models/UserSchema')
const Message = require('../../models/MessageSchema')

const router = express.Router()

router.post('/users/messages/create',
  [
  body('text')
    .notEmpty()
]), async (req, res ) => {
  try {
    const text = req.body.text
    console.log(req.body)
    const message = new Message({
      text
    })
    await message.save()
    console.log(message);
    res.status(200).send(new RequestHandler(message))
  } catch (error) {
    console.log(error)
  }
}

export { router as createMessageRouter }
