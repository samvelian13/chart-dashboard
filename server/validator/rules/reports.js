const moment = require('moment')
const { query } = require('express-validator')

const isValidDate = (date) => {
  return moment(date, 'MMM-YYYY').isValid()
}

const reportsRules = [
  query('from')
    .optional()
    .custom(isValidDate),
  query('to')
    .optional()
    .custom(isValidDate)
]

module.exports = { reportsRules }
