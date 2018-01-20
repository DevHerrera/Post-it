var User = require('./user')

var mongoose = require('mongoose')
    Schema = mongoose.Schema

// Token schema for our user's auth.
var TokenSchema = Schema({
    user: {type: Schema.ObjectId, ref: 'User', required: true},
    value: {type: String, required: true},
    created: {type: Date, required: true, default: Date.now()},
    expires: {type: Date, required: true}
})

module.exports = mongoose.model('Token', TokenSchema)
