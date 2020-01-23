export default {
  getReportsPending(state) {
    state.chartLoading = true
  },
  getReportsSuccess(state, payload) {
    const { chartLabels, xAxisPoints } = payload

    const datasets = []
    for (const [key, value] of Object.entries(xAxisPoints)) {
      const lineConfigs = {
        type: 'line',
        label: key,
        data: value,
        borderColor: '#2196F3',
        fill: true
      }
      datasets.push(lineConfigs)
    }

    state.reportsChartData = { labels: chartLabels, datasets }
    state.chartLoading = false
  },
  getReportsFailed(state) {
    state.chartLoading = false
    state.reportsChartData = null
  }
}
