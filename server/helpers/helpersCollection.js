const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

const normalizeResponseData = (data, message = '') => {
  return {
    data,
    message
  }
}

const getToken = (req) => {
  let token = null

  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.query && req.query.token) {
    token = req.query.token
  }

  return token
}

const generateToken = (data) => jwt.sign(data, jwtSecret)

module.exports = {
  normalizeResponseData,
  getToken,
  generateToken
}
