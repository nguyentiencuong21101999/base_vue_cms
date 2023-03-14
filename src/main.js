import '@/services/api'
import '@/services/apiGenWeb'
import VueCompositionAPI from '@vue/composition-api'
import { ModalPlugin, ToastPlugin } from 'bootstrap-vue'
import Vue from 'vue'

import i18n from '@/libs/i18n'
import JsonCSV from 'vue-json-csv'
import App from './App.vue'
import router from './router'
import store from './store'

// Global Components
import './global-components'

// 3rd party plugins
import '@/helpers/filter'
import '@/libs/acl'
import '@/libs/clipboard'
import '@/libs/portal-vue'
import '@/libs/sweet-alerts'
import '@/libs/toastification'
import '@/libs/tour'
import '@/libs/vue-google-map'
import '@/libs/vue-select'

// Axios Mock Adapter
import '@/@fake-db/db'

Vue.component('downloadCsv', JsonCSV)

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// Feather font icon - For form-wizard
require('@core/assets/fonts/feather/iconfont.css') // For form-wizard

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
