export default function({ store, redirect }) {
  if (!store.getters['auth/loggedIn']) {
    redirect({ name: 'auth-login' })
    store.commit(
      'snackbarOpen',
      { text: 'Unauthorized, please login again' },
      { root: true }
    )
  }
}
