export default function({ store, redirect, app: { $notify } }) {
  if (!store.getters['auth/loggedIn']) {
    redirect({ name: 'auth-login' })
    $notify.show({ text: 'Unauthorized, please login again' })
  }
}
