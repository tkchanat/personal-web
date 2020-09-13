import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueMarkdown from 'vue-markdown'
import VueMeta from 'vue-meta'
import VueAnalytics from 'vue-analytics'
import VueMathjax from 'vue-mathjax'

Vue.config.productionTip = false
Vue.component('vue-markdown', VueMarkdown)

Vue.use(VueMeta, { refreshOnceOnNavigation: true })
Vue.use(VueAnalytics, { id: 'UA-140769402-1' })
Vue.use(VueMathjax)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
