import tokenParser from '~/helpers/helperCollections'

export default function({ $axios, store, redirect, env }) {
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
    if (code === 401) {
      store.commit('setError', error)
      // redirect('/login')
    }

    if (code === 500) {
      store.commit('setError', error)
    }
    // throw error
  })
}
