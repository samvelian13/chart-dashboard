import { REPORTS } from '@/links'

export default {
  async getReports({ commit }, payload) {
    commit('getReportsPending')
    try {
      const reports = await this.$axios.$get(REPORTS, {
        params: payload
      })
      commit('getReportsSuccess', reports)
    } catch (e) {
      commit('getReportsFailed')
    }
  }
}
