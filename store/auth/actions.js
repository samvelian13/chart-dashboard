import { LOGIN, REGISTER } from '@/links'

export default {
  async login({ commit }, payload) {
    commit('mutateLoading', true)
    try {
      const result = await this.$axios.$post(LOGIN, payload)
      if (result.data) {
        localStorage.setItem('token', result.data)
        commit('loginSuccess', result.data)

        this.$router.push({ name: 'index' })
      }
    } catch (e) {
      this.$notify.show({ text: e.response.data })
    } finally {
      commit('mutateLoading', false)
    }
  },
  async register({ commit }, payload) {
    commit('mutateLoading', true)
    try {
      const result = await this.$axios.$post(REGISTER, payload)
      if (result.data) {
        localStorage.setItem('token', result.data)
        commit('registerSuccess', result.data)
        this.$router.push({ name: 'index' })
        this.$notify.show({ text: result.message, color: 'green' })
      }
    } catch (e) {
      this.$notify.show({ text: e.response.data })
    } finally {
      commit('mutateLoading', false)
    }
  }
}
