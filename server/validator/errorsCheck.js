const { validationResult } = require('express-validator')

module.exports = (req, res, next) => {
  const errorFormatter = ({ msg, nestedErrors }) => {
    if (nestedErrors) {
      const modifiedArr = {}
      const map = new Map()
      for (const item of nestedErrors) {
        if (!map.has(item.param)) {
          map.set(item.param, true)
          modifiedArr[item.param] = item.msg
        }
      }
      return modifiedArr
    }
    return msg
  }
  const result = validationResult(req).formatWith(errorFormatter)

  if (!result.isEmpty()) {
    return res.status(422).json(result.mapped())
  } else {
    next()
  }
}
