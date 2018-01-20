const express = require('express')
const router = express.Router()
const protected = require('../protected')

// Post controller
const post_controller = require('../../controllers/post/postController')
// Home page
router.get('/', protected.isAuthenticated, post_controller.home)

module.exports = router