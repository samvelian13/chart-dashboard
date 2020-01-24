export const state = () => ({
  snackbar: {
    value: false,
    timeout: 5000,
    x: 'right',
    y: 'top',
    text: '',
    color: 'red'
  }
})
export const mutations = {
  snackbarOpen(state, payload) {
    state.snackbar = { ...state.snackbar, ...payload, value: true }
  },
  snackbarClose(state) {
    state.snackbar = { ...state.snackbar, value: false }
  }
}
