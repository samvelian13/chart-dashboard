const jwt = require('jsonwebtoken')
const jwtSecret = 'test'

const normalizeResponseData = (data, message = '') => {
  return {
    data,
    message
  }
}

function getToken(req) {
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

function getUserFromToken(token) {
  const decoded = jwt.decode(token)
  return { email: decoded.email }
}

function generateToken(data) {
  return jwt.sign(data, jwtSecret)
}

module.exports = {
  normalizeResponseData,
  getToken,
  getUserFromToken,
  generateToken
}
