const express = require('express')
const router = express.Router()

// Require controllers
const authentication_controller = require('../../controllers/user/authenticationController')

// REGISTRATION
router.post('/register', authentication_controller.register)
// AUTHENTICATION
router.post('/login', authentication_controller.authenticate)

module.exports = router
