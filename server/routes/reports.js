const router = require('express').Router()
const ReportsController = require('../controllers/ReportsController')
// Rules
const { reportsRules } = require('../validator/rules/reports')
const errorsCheck = require('../validator/errorsCheck')

router.route('/').get(reportsRules, errorsCheck, ReportsController.getChartData)

module.exports = router
