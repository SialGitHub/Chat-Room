import {signUpRouter} from "./api/routes/auth/signUp";
console.log(signUpRouter);
import {signInRouter} from "./api/routes/auth/signIn";
import {signOutRouter} from "./api/routes/auth/signOut";

import {createMessageRouter} from "./api/routes/messages/createMessage";
import {getAllMessagesRouter} from "./api/routes/messages/getAllMessages";
import {getMessageByIdRouter} from "./api/routes/messages/getMessageById";

const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const swaggerUi = require('swagger-ui-express')
const jsyaml = require('js-yaml')
const spec = fs.readFileSync('swagger.yaml', 'utf-8')
const swaggerDocument = jsyaml.safeLoad(spec)

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(signUpRouter)
app.use(signInRouter)
app.use(signOutRouter)

app.use(createMessageRouter)
app.use(getAllMessagesRouter)
app.use(getMessageByIdRouter)

module.exports = app

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
app.listen(process.env.SERVER_PORT || 3000)



