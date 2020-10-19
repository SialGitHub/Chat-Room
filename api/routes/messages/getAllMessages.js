import {requireAuth} from "../../common/middlewares/require-auth";
import {currentUser} from "../../common/middlewares/current-user";

const express = require('express')

const requestHandler = require('../../utils/requestHandler');

const User = require('../../models/UserSchema');
const Message = require('../../models/MessageSchema');

const router = express.Router()

router.get('/users/messages/list', requireAuth, currentUser,
  async ( req, res ) => {
  try {
    const messages = User.find({messages})
  }catch (error){
    console.log(error)
  }
})

export { router as getAllMessagesRouter }
