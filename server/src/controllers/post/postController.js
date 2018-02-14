const async = require('async')
const config = require('../../config/config')
const jwt = require('jsonwebtoken')


// Home page controller, must send dynamic data based in user's preferences.
exports.home = function(req, res) {
  res.send({
    msg: 'Hola!'
  })
}