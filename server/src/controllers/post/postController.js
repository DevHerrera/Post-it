const async = require('async')
const config = require('../../config/config')
const jwt = require('jsonwebtoken')

exports.home = function(req, res) {
  res.send({
    msg: 'Hola!'
  })
}