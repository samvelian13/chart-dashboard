const bcrypt = require('bcrypt')
const uuidv1 = require('uuid/v1')
const db = require('../database/jsonDB')
const {
  normalizeResponseData,
  generateToken
} = require('../helpers/helpersCollection')

const login = (req, res) => {
  const { email, password } = req.body

  const findUser = db
    .get('users')
    .find({ email })
    .value()

  const errorMsg =
    'Failed to login due to incorrect email or password. Please retry.'

  if (!findUser) {
    return res.status(404).json(errorMsg)
  }

  bcrypt.compare(password, findUser.password, (err, same) => {
    if (!same || err) {
      return res.status(404).json(errorMsg)
    }
    const accessToken = generateToken({
      email,
      userName: findUser.userName
    })
    res.json(normalizeResponseData(accessToken))
  })
}

const register = async (req, res) => {
  const { userName, email, password } = req.body

  const isUniqueEmail = db
    .get('users')
    .find({ email })
    .value()
  if (isUniqueEmail) {
    return res.status(409).json('This email already taken')
  }
  const passHash = await bcrypt.hash(password, 10)
  if (!passHash) {
    return res.status(500).json('Something went wrong!!')
  }
  db.get('users')
    .push({ id: uuidv1(), userName, email, password: passHash })
    .write()

  const accessToken = generateToken({ email, userName })
  return res
    .status(201)
    .json(normalizeResponseData(accessToken, 'You are successfully sign up'))
}
module.exports = { login, register }
