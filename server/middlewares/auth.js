const jwt = require('jsonwebtoken')
const { getToken } = require('../helpers/helpersCollection')
const jwtSecret = process.env.JWT_SECRET

module.exports = (req, res, next) => {
  const token = getToken(req)

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json('Unauthorized, please login again')
      } else {
        next()
      }
    })
  } else {
    res.status(401).json('Unauthorized, please login again')
  }
}
