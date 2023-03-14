import Axios from 'axios'
import { camelizeKeys } from 'humps'
import CryptoJS from 'crypto-js'
import store from '@/store'

const baseURL = process.env.VUE_APP_GEN_WEB_API_URL || 'https://stageapicob.generationweb.com.au/GWBetService/r'
const api = Axios.create({ baseURL })

api.interceptors.request.use(
  config => {
    const clientKey = process.env.VUE_APP_BASE_CLIENT_KEY || 'colossalbet'
    const secretKey = process.env.VUE_APP_BASE_SECRET_KEY || 'xnoh8dbr2pelqeuflv'
    const requestUri = baseURL.replace('/r', '')
    const timeStamp = (Date.now() + 1100).toFixed()

    const signature = CryptoJS.HmacSHA1(requestUri, `${secretKey}${timeStamp}`)

    const authorizationKey = `clientKey=${clientKey}&timestamp=${timeStamp}&signature=${signature}`
    config.headers.Authorization = authorizationKey
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

store.$apiGenWeb = api

export default api
