const express = require('express')
const router = express.Router()

// Post controller
const post_controller = require('../../controllers/post/postController')
// Home page
router.get('/', post_controller.home)

module.exports = router