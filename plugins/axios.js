import tokenParser from '~/helpers/helperCollections'

export default function({ $axios, store, redirect }) {
  $axios.onRequest((request) => {
    if (
      store.getters['auth/loggedIn'] &&
      !request.headers.common.Authorization
    ) {
      const token = tokenParser()
      if (token) {
        request.headers.common.Authorization = `Bearer ${token}`
      }
    }
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401 || code === 500) {
      redirect({ name: 'auth-login' })
      store.commit(
        'snackbarOpen',
        { text: error.response.data },
        { root: true }
      )
    }
  })
}
