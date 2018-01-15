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

    if(!errors.isEmpty()) {
      // There are errors, let's send them.      
      res.status(400).json({
        error: errors.array()
      })
      return
    }
    else {
      // Data is valid
      user.save(function(err) {
        if (err) {
          if (err.code == 11000) {
            // Email or username could violate the unique index, let's see what field it was
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

exports.authenticate = [
  // Validate fields
  body('username', 'Invalid data.').isLength({min: 1}).trim(),
  body('password', 'Invalid data.').isLength({min: 1}).trim(),
  // Sanitize fields
  sanitizeBody('username').escape(),
  sanitizeBody('password').escape(),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // There are erros with form data      
      res.status(400).json({
        error: errors.array()
      })
      return
    }
    else {
      // Lets find the user
      User.findOne({username: req.body.username}, function (err, user) {
        if (err || user === null) {
          // User with form's data username not found
          res.status(404).json({
            error: 'User does not exist'
          })          
        }
        else {
          // User found, lets authenticate passwords          
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (err || !isMatch) {
              // Password did not match
              res.status(401).json({
                error: 'Password incorrect'
              })           
            }
            if (isMatch) {
              // Passwords matched, let's return a token with the user's data
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
