const async = require('async')
const config = require('../../config/config')
const jwt = require('jsonwebtoken')

// Models
const User = require('../../models/user')


 // Request validation
const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

exports.register = [
  // Validate fields
  body('username', 'Username must be between 4-15 characters long.').isLength({ min: 4, max: 15}).trim(),
  body('email', 'Not a valid email.').isEmail().trim().normalizeEmail(),
  body('password', 'Password must be between 8-32 characters long.').isLength({ min: 8, max: 32 }).trim()
  .matches(/\d/).
  withMessage('Password must contain a number.'),
  body('passwordMatch', 'The passwords does not match').exists()
  .custom((value, { req }) => value === req.body.password),
  // Sanitize fields
  sanitizeBody('username').trim().escape(),
  sanitizeBody('email').trim().escape(),
  sanitizeBody('password').trim().escape(),

  // Process request after validation/sanitization
  (req, res, next) => {
    // Extract errors from validation/sanitization
    const errors = validationResult(req)

    // Create an user update with escaped and trimmed data
    var user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })

    // There are errors, let's send them.
    if(!errors.isEmpty()) {
      res.status(400).json({
        error: errors.array()
      })
      return
    }
    // Data is valid
    else {
      // Let's try to store the user.
      user.save(function(err) {
        // There are errors
        if (err) {
          // Email or username could violate the unique index, let's see what field it was
          if (err.code == 11000) {
            var field = err.message.split(".$")[1]
            field = field.split(" dup key")[0]
            field = field.substring(0, field.lastIndexOf("_"))
            var error_json = [
              {
                msg: `This ${field} is already in use.`
              }
            ]
            res.status(400).json({
              error: error_json
            })
          }
        }
        // No errors, the user is stored
        else {
          res.status(201).json({
            sucess: true,
            message: 'The user have been created!'
          })
        }
      })
    }
  }
]

// Authenticates the user, requires username and password.

exports.authenticate = [
  // Validate fields
  body('username', 'Invalid data.').isLength({min: 1}).trim(),
  body('password', 'Invalid data.').isLength({min: 1}).trim(),
  // Sanitize fields
  sanitizeBody('username').escape(),
  sanitizeBody('password').escape(),

  // After checking the user's input data
  (req, res, next) => {
    // Check for errors
    const errors = validationResult(req)
    // There are erros with form data
    if (!errors.isEmpty()) {
      res.status(400).json({
        error: errors.array()
      })
      return
    }
    // No errors with the input data
    else {
      var errors_json = [
        { msg: '' }
      ]
      // Let's search for a  user with the input's username
      User.findOne({username: req.body.username}, function (err, user) {
        if (err || user === null) {
          // User with form's data username not found
          errors_json[0].msg = 'User does not exist'
          res.status(404).json({
            error: errors_json
          })
        }
        // User found, lets authenticate passwords
        else {
          user.comparePassword(req.body.password, function (err, isMatch) {
            // Password did not match
            if (err || !isMatch) {
              errors_json[0].msg = 'Password incorrect'
              res.status(401).json({
                error: errors_json
              })
            }
            // Passwords matched, let's return a token with the user's data
            if (isMatch) {
              const payload = {
                user_id: user._id,
                username: user.username
              }
              var token = jwt.sign(payload, config.secret, {
                expiresIn: 1440 // expires in 24 hours
              })

              res.status(200).json({
                message: 'Welcome back!',
                token: token
              })
            }
          })
        }
      })
    }
  }
]
