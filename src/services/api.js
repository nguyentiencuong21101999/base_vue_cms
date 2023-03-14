import Axios from 'axios'
import { camelizeKeys } from 'humps'
import store from '@/store'

const baseURL = process.env.VUE_APP_BASE_API_URL || 'https://dev-api.wolfden.bet/bo'
const api = Axios.create({ baseURL })

api.interceptors.request.use(
  config => {
    const { accessToken: token } = store.state.auth
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => Promise.reject(error),
)

api.interceptors.response.use(
  response => {
    if (response.data && response.headers['content-type'] === 'application/json; charset=utf-8') {
      response.data = camelizeKeys(response.data)
    }
    return response
  },
  error => Promise.reject(error),
)

store.$api = api

export default api
