import Vue from 'vue'
import Toast, { createToastInterface } from 'vue-toastification'

// Toast Notification Component Styles
import '@core/scss/vue/libs/toastification.scss'

/**
 * NOTE: If you are using other transition them make sure to import it in `src/@core/scss/vue/libs/notification.scss` from it's source
 */
const options = {
  hideProgressBar: true,
  closeOnClick: false,
  closeButton: false,
  icon: false,
  timeout: 3000,
  transition: 'Vue-Toastification__fade',
}

Vue.use(Toast, options)

const toast = createToastInterface(options)

export default toast
