export default ({ app, store }, inject) => {
  inject('notify', {
    show(payload) {
      store.commit('snackbar/show', payload)
    }
  })
}
