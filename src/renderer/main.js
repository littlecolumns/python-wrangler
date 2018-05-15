import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import { faUpload, faDownload, faSync, faLink, faExternalLinkSquareAlt } from '@fortawesome/fontawesome-free-solid'
import fontawesome from '@fortawesome/fontawesome'

fontawesome.library.add(faUpload)
fontawesome.library.add(faDownload)
fontawesome.library.add(faSync)
fontawesome.library.add(faLink)
fontawesome.library.add(faExternalLinkSquareAlt)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
