const async = require('async')
const config = require('../config/config')
const jwt = require('jsonwebtoken')

exports.isAuthenticated = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['authtoken']
  if (token) {
      jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        console.log(err)
        return res.status(403).json( { success: false, message: 'Forbidden'})
      }
      req.user = decoded
      next()
      })
  }
  else {
      res.status(403).send({
      success: false,
      message: 'You must sign in to see this page'
      })
  }
}