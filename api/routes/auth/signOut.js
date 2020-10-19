const express = require('express')
const router = express.Router()

router.post('/users/signout', (req, res) => {
  req.session = null
  res.send({ resultCode: '0' })
})

export { router as signOutRouter }
