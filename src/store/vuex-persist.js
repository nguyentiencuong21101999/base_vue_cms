import VuexPersist from 'vuex-persist'
import Crypto from 'crypto-js'
import Cookie from 'js-cookie'
import { v4 } from 'uuid'

const cookieName = 'wd-auth'
const storageKey = 'wd-auth'
const encryptionToken = Cookie.get(cookieName) || v4()
Cookie.set(cookieName, encryptionToken, { secure: true, expires: 180 })

const vuexPersist = new VuexPersist({
  modules: ['auth'],
  storage: {
    getItem: () => {
      const store = window.localStorage.getItem(storageKey)
      if (store) {
        try {
          const bytes = Crypto.AES.decrypt(store, encryptionToken)
          return JSON.parse(bytes.toString(Crypto.enc.Utf8))
        } catch (e) {
          window.localStorage.removeItem(storageKey)
        }
      }
      return null
    },
    setItem: (_, value) => {
      const store = Crypto.AES.encrypt(value, encryptionToken).toString()
      return window.localStorage.setItem(storageKey, store)
    },
    removeItem: () => window.localStorage.removeItem(storageKey),
  },
})

export default vuexPersist
