import { LOGIN, REGISTER } from '@/links'

export default {
  async login({ commit }, payload) {
    commit('mutateLoading', true)
    try {
      const result = await this.$axios.$post(LOGIN, payload)
      if (result.data) {
        localStorage.setItem('token', btoa(JSON.stringify(result.data)))
        commit('loginSuccess')
        this.$router.push({ name: 'index' })
      }
    } catch (e) {
      commit('snackbarOpen', { text: e.response.data }, { root: true })
    } finally {
      commit('mutateLoading', false)
    }
  },
  async register({ commit }, payload) {
    commit('mutateLoading', true)
    try {
      const result = await this.$axios.$post(REGISTER, payload)
      if (result.data) {
        localStorage.setItem('token', btoa(JSON.stringify(result.data)))
        commit('registerSuccess')
        setTimeout(() => {
          commit(
            'snackbarOpen',
            { text: result.message, color: 'green' },
            { root: true }
          )
        }, 2000)
        this.$router.push({ name: 'index' })
      }
    } catch (e) {
      commit('snackbarOpen', { text: e.response.data }, { root: true })
    } finally {
      commit('mutateLoading', false)
    }
  }
}
