import list from './list'
import filter from './filter'
import sendMail from './send-mail'

const accountModule = {
  namespaced: true,
  modules: { list, filter, sendMail },
}

export default accountModule
