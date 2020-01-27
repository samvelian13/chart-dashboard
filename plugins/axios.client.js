export default function({ $axios, store, app }) {
  $axios.onRequest((request) => {
    if (
      store.getters['auth/loggedIn'] &&
      !request.headers.common.Authorization
    ) {
      const token = localStorage.getItem('token')
      request.headers.common.Authorization = `Bearer ${token}`
    }
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      store.commit('auth/logout')
      app.$notify.show({ text: error.response.data })
    }

    if (code === 500) {
      app.$notify.show({ text: error.response.data })
    }
  })
}
