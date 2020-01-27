import { getUserFromToken } from '~/helpers/helperCollections'

const token = localStorage.getItem('token')

export default () => ({
  user: getUserFromToken(token)
})
