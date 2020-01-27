import { getUserFromToken } from '~/helpers/helperCollections'

const token = localStorage.getItem('token')

export default () => ({
  loading: false,
  user: getUserFromToken(token)
})
