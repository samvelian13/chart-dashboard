const router = require('express').Router()
const Auth = require('../controllers/AuthController')
// Rules
const { loginRules, registerRules } = require('../validator/rules/auth')
const errorsCheck = require('../validator/errorsCheck')

router.route('/login').post(loginRules, errorsCheck, Auth.login)
router.route('/register').post(registerRules, errorsCheck, Auth.register)

module.exports = router
