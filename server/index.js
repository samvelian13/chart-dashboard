const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// Routes
const apiRoutes = require('./routes')
const app = express()

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  headers: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization'
  ],
  credentials: true
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', apiRoutes)

module.exports = app
