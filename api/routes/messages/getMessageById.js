import {requireAuth} from "../../common/middlewares/require-auth";
import {currentUser} from "../../common/middlewares/current-user";

const express = require('express')

const requestHandler = require('../../utils/requestHandler');

const Message = require('../../models/MessageSchema');

const router = express.Router()

router.get('/users/messages/:id', requireAuth, currentUser,
  async ( req, res ) => {
  try {
    const message = await Message.findOne({id});
  }catch (error){
    console.log(error)
  }
})

export { router as getMessageByIdRouter }
