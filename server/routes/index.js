const express = require('express')
// const jwtMiddleware = require('../middlewares/auth')
// Routes
const authRoutes = require('./auth')
const router = express.Router()

router.use('/auth', authRoutes)

module.exports = router
