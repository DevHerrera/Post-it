const async = require('async')
const config = require('../../config/config')
const jwt = require('jsonwebtoken')

exports.home = function(req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(403).json( { success: false, message: 'Forbidden'})
      res.status(200).json( { success: true, user: decoded})
    })
  }
  else {
    return res.status(403).send({
        success: false,
        message: 'Forbidden'
    });
  }
}