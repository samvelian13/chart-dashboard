const { body } = require('express-validator')

const loginRules = [
  body('email')
    .exists()
    .bail()
    .isEmail()
    .bail()
    .normalizeEmail(),
  body('password')
    .exists()
    .bail()
    .isLength({ min: 6, max: 16 })
    .bail()
    .trim()
    .escape()
]

const registerRules = [
  body('userName')
    .exists()
    .bail()
    .trim()
    .isLength({ min: 4 })
    .bail()
    .escape(),
  body('email')
    .exists()
    .bail()
    .isEmail()
    .bail()
    .normalizeEmail(),
  body('password')
    .exists()
    .bail()
    .trim()
    .isLength({ min: 6, max: 16 })
    .bail()
    .escape()
]

module.exports = { loginRules, registerRules }
