import { REPORTS } from '@/links'

export default {
  async getReports({ commit }, payload) {
    commit('getReportsPending')
    try {
      const reports = await this.$axios.$get(REPORTS, {
        params: payload
      })
      setTimeout(() => {
        commit('getReportsSuccess', reports)
      }, 3000)
    } catch (e) {
      setTimeout(() => {
        commit('getReportsFailed')
      }, 3000)
    }
  }
}
