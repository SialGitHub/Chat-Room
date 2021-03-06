import { body } from 'express-validator'

import { Password } from '../../services/password'

const jwt = require('jsonwebtoken')
const express = require('express')
const RequestHandler = require('../../utils/requestHandler')

const User = require('../../models/UserSchema')

const router = express.Router()

router.post('/users/signin',
  [
    body('email')
      .notEmpty()
      .isEmail()
      .withMessage({ errorCode: '1', messageText: 'Email must be valid' }),
    body('password')
      .notEmpty()
      .trim()
      .isLength({ min: 8, max: 128 })
      .withMessage({ errorCode: '2', messageText: 'Password must be at least 8 characters long' })
  ], async (req, res) => {
    try {
      let password = req.body.password
      const email = req.body.email

      const existingUser = await User.findOne({ email })
      if (!existingUser) {
        console.log("Email doesn't exist", '4')
      }

      const passwordMatch = await Password.compare(existingUser.password, password)

      if (!passwordMatch) {
        console.log('Invalid credentials', '4')
      }
      const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
      }, process.env.JWT_KEY)
      req.session = {
        jwt: userJwt
      }
      const user = {
        user: existingUser
      }
      res.status(200).send(new RequestHandler(user))
    } catch (e) {
      console.log(e.message)
    }
  })

export { router as signInRouter }
