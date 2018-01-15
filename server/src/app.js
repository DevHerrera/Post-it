var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var mongoose = require('mongoose')
var config = require('./config/config')
var app = express()

// Database set up
var mongoDB = 'mongodb://devherrera:postitapp@ds257627.mlab.com:57627/post-it'
mongoose.connect(mongoDB, {
  useMongoClient: true
})

mongoose.Promise = global.Promise

var db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error'))

// App config setup
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

//Routes set up
var authentication = require('./routes/user/authenticationRoute')
var post = require('./routes/post/postRoute')
var index = require('./routes/index')

app.use('/', index)
app.use('/user', authentication)
app.use('/post', post)

// Running server
app.listen(process.env.PORT || 3000)
console.log('Server listening on port ' + config.port)
