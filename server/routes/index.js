const express = require('express')
const jwtMiddleware = require('../middlewares/auth')
// Routes
const authRoutes = require('./auth')
const reportsRoutes = require('./reports')
const router = express.Router()

router.use('/auth', authRoutes)
router.use('/reports', jwtMiddleware, reportsRoutes)

module.exports = router
