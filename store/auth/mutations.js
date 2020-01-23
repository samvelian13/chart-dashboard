export default {
  mutateLoading(state, payload) {
    state.loading = payload
  },
  loginSuccess(state) {
    state.loading = false
    state.user = true
  },
  registerSuccess(state) {
    state.loading = false
    state.user = true
  }
}
