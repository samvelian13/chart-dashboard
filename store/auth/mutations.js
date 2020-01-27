import { getUserFromToken } from '~/helpers/helperCollections'

export default {
  mutateLoading(state, payload) {
    state.loading = payload
  },
  loginSuccess(state, payload) {
    state.loading = false
    state.user = getUserFromToken(payload)
  },
  registerSuccess(state, payload) {
    state.loading = false
    state.user = getUserFromToken(payload)
  },
  logout(state) {
    state.user = null
    localStorage.removeItem('token')
    this.$router.push({ name: 'auth-login' })
  }
}
