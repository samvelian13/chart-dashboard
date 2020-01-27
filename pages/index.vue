<template>
  <v-card>
    <v-overlay :value="chartLoading" absolute color="grey lighten-1">
      <v-progress-circular :size="70" color="blue" indeterminate />
    </v-overlay>
    <v-card-title>
      Reports Chart
    </v-card-title>
    <v-card-text>
      <div v-if="reportsChartData">
        <line-chart :chart-data="reportsChartData" />
        <div class="mt-5">
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
            <v-row align="center" justify="space-around">
              <v-col cols="4">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="from"
                  rules="required"
                >
                  <v-select
                    v-model="chartFilter.from"
                    :items="cachedLabels"
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
                    :items="cachedLabels"
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
  layout: 'dashboard',
  components: {
    lineChart,
    ValidationObserver,
    ValidationProvider
  },
  head() {
    return {
      title: 'Home'
    }
  },
  data() {
    return {
      showFilterError: false,
      chartFilter: {
        from: null,
        to: null
      }
    }
  },
  computed: {
    ...mapState('dashboard', [
      'reportsChartData',
      'chartLoading',
      'cachedLabels'
    ])
  },
  watch: {
    chartFilter: {
      async handler() {
        this.showFilterError = false
        const isValid = await this.$refs.filter.validate()
        const { from, to } = { ...this.chartFilter }

        if (!isValid) {
          return false
        } else if (moment(from, 'MMM-YYYY').isSameOrAfter(to, 'month')) {
          this.showFilterError = true
        } else {
          this.getReports(this.chartFilter)
        }
      },
      deep: true
    }
  },
  beforeDestroy() {
    this.clearReports()
  },
  created() {
    this.getReports()
  },
  methods: {
    ...mapActions('dashboard', ['getReports']),
    ...mapMutations('dashboard', ['clearReports']),
    resetFilter() {
      this.getReports()
    }
  }
}
</script>
