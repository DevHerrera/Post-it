const async = require('async')
const config = require('../config/config')
const jwt = require('jsonwebtoken')

// MIDDLEWARES

// Checks if the user is authenticated
exports.isAuthenticated = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['authtoken']
  // It the token exists
  if (token) {
      jwt.verify(token, config.secret, function(err, decoded) {
        // Token is not valid
        if (err) {
          console.log(err)
          return res.status(403).json( { success: false, message: 'Forbidden'})
        }
        // Token is valid
        else{
          req.user = decoded
          next()
        }
      })
  }
  // The token does not exist
  else {
      res.status(403).send({
      success: false,
      message: 'You must sign in to see this page'
      })
  }
}