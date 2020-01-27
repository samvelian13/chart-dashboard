import jwt from 'jsonwebtoken'

const getUserFromToken = (token) => {
  return token ? jwt.decode(token) : null
}

export { getUserFromToken }
