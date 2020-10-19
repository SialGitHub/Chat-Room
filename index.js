import {signUpRouter} from "./api/routes/auth/signUp";
import {signInRouter} from "./api/routes/auth/signIn";
import {signOutRouter} from "./api/routes/auth/signOut";

import {createMessageRouter} from "./api/routes/messages/createMessage";
import {getAllMessagesRouter} from "./api/routes/messages/getAllMessages";
import {getMessageByIdRouter} from "./api/routes/messages/getMessageById";

const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const defaultPort = 3000

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.use(signUpRouter)
app.use(signInRouter)
app.use(signOutRouter)

app.use(createMessageRouter)
app.use(getAllMessagesRouter)
app.use(getMessageByIdRouter)

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log('Connected to MongoDB successfully')
  } catch (error) {
    console.error(error)
  }
}
start().then()
const server = app.listen(process.env.SERVER_PORT || defaultPort)
if(server){
  console.log("Server started successfully on port " + process.env.SERVER_PORT || defaultPort)
}


