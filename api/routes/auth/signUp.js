const {body} = require('express-validator');
const {Password} = require("../../services/password");

const express = require('express');
const jwt = require('jsonwebtoken');

const RequestHandler = require('../../utils/requestHandler');

const User = require('../../models/UserSchema');

const router = express.Router();

router.post('users/signup',
  [
  body('email')
    .notEmpty()
    .isEmail()
    .withMessage({ errorCode: '1', messageText: "Email must be valid "}),
  body('password')
    .notEmpty()
    .trim()
    .isLength({ min: 8, max: 128})
    .withMessage({ errorCode: '2', messageText: 'Password must be at least 8 characters' })
], async (req, res) => {
  try{
    let {password} = req.body
    const {email} = req.body

    const existingUser = await User.findOne({email})
    if (existingUser){
      throw new BadRequestError('Email in use', '3')
    }
    password = await Password.toHash(password)
    const user = new User({
      email,
      password,

    })
    await user.save()

    const userJWT = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY)

    req.session = {
      jwt: userJWT
    }

    res.status(201).send(new RequestHandler(user))
  } catch (e) {
    throw new BadRequestError(e.message, '-')
  }
})

export { router as signUpRouter }
