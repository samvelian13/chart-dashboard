export default ({ store, redirect }) => {
  if (!store.getters['auth/loggedIn']) {
    redirect({ name: 'auth-login' })
  }
}
