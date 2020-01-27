const moment = require('moment')
const db = require('../database/jsonDB')

const getChartData = (req, res) => {
  const { from, to } = req.query

  const reports = db
    .get('reports')
    .filter((val) => {
      if (!from || !to) {
        return true
      }
      return moment(val.date, 'YYYY-MM-DD').isBetween(from, to, 'month', '[]')
    })
    .sortBy('date')
    .value()

  if (!reports) {
    return res.status(500).json('Something went wrong!!')
  }
  if (!reports.length) {
    res.status(404).json('Not found any record')
  }
  const chartLabels = new Set()
  const xAxisPoints = {
    amount: []
  }
  reports.forEach((item) => {
    xAxisPoints.amount.push(item.amount)
    chartLabels.add(moment(item.date, 'YYYY-MM-DD').format('MMM-YYYY'))
  })

  res.status(200).json({ chartLabels: Array.from(chartLabels), xAxisPoints })
}

module.exports = { getChartData }
