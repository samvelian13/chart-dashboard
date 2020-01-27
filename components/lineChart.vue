<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'LineChart',
  extends: Line,
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  computed: {
    options() {
      return {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: 'Dashboard'
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Amount'
              }
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Months'
              }
            }
          ],
          yAxis: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    }
  },
  watch: {
    chartData() {
      this.renderChart(this.chartData, this.options)
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
