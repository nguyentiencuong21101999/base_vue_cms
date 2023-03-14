import Vue from 'vue'
import Vuex from 'vuex'
import vuexPersist from '@/store/vuex-persist'

// Modules
import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'
import auth from './auth'
import account from './account'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import emailSubscribe from './email-subscribe'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    auth,
    account,
    appConfig,
    verticalMenu,
    emailSubscribe,
    'app-ecommerce': ecommerceStoreModule,
  },
  strict: process.env.DEV,
  plugins: [vuexPersist.plugin],
})
