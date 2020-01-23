const path = require('path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(path.resolve(__dirname, 'db.json'))

const db = low(adapter)
const usersModel = db.has('users').value()
if (!usersModel) {
  db.set('users', []).write()
}
module.exports = db
