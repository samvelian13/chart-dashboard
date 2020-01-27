const mainSnackState = () => {
  return {
    value: false,
    text: '',
    color: 'red'
  }
}

export const state = () => ({
  settings: mainSnackState()
})
export const mutations = {
  show(state, payload) {
    state.settings = { ...state.settings, ...payload, value: true }
  },
  hide(state) {
    state.settings = mainSnackState()
  }
}
