import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueMarkdown from 'vue-markdown'

Vue.config.productionTip = false
Vue.component('vue-markdown', VueMarkdown)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
