<template>
  <v-card>
    <v-overlay :value="chartLoading" absolute color="grey lighten-1">
      <v-progress-circular :size="70" color="blue" indeterminate />
    </v-overlay>
    <v-card-title>
      Reports Chart
    </v-card-title>
    <v-card-text>
      <div v-if="chartData">
        <line-chart :chart-data="chartData" :options="chartOptions" />
        <div class="filter-box mt-5">
          <v-alert
            v-if="showFilterError"
            text
            type="error"
            icon="mdi-cloud-alert"
            elevation="2"
          >
            Wrong filter data
          </v-alert>
          <ValidationObserver ref="filter">
            <v-row align="center">
              <v-col cols="4">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="from"
                  rules="required"
                >
                  <v-select
                    v-model="chartFilter.from"
                    :items="chartData.labels"
                    :error-messages="errors"
                    label="From"
                  />
                </ValidationProvider>
              </v-col>
              <v-col cols="4">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="to"
                  rules="required"
                >
                  <v-select
                    v-model="chartFilter.to"
                    :items="chartData.labels"
                    :error-messages="errors"
                    label="To"
                  />
                </ValidationProvider>
              </v-col>
              <v-btn @click="resetFilter" color="blue" outlined>
                reset filter
              </v-btn>
            </v-row>
          </ValidationObserver>
        </div>
      </div>
      <div v-else-if="!chartLoading">
        Not found any record
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import moment from 'moment'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import lineChart from '~/components/lineChart'

export default {
  components: {
    lineChart,
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      showFilterError: false,
      chartFilter: {
        from: null,
        to: null
      },
      chartData: null,
      chartOptions: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: 'Dashboard'
        },
        scales: {
          xAxes: [
            {
              ticks: {}
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
  computed: {
    ...mapState('dashboard', ['reportsChartData', 'chartLoading'])
  },
  watch: {
    reportsChartData(newData) {
      this.chartData = { ...newData }
    },
    chartFilter: {
      async handler() {
        this.showFilterError = false
        const isValid = await this.$refs.filter.validate()
        const { from, to } = this.chartFilter

        if (!isValid) {
          return false
        } else if (moment(from, 'MMM-YYYY').isSameOrAfter(to, 'month')) {
          this.showFilterError = true
        } else {
          const optionsClone = { ...this.chartOptions }
          optionsClone.scales.xAxes[0].ticks = {
            min: from,
            max: to
          }
          this.chartOptions = { ...optionsClone }
        }
      },
      deep: true
    }
  },
  created() {
    this.getReports()
  },
  methods: {
    ...mapActions('dashboard', ['getReports']),
    ...mapMutations(['snackbarOpen']),
    resetFilter() {
      this.chartFilter = {
        from: null,
        to: null
      }
    }
  }
}
</script>
