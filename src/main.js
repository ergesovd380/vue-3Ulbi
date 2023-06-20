import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import GlobalComponent from '@/components'
import GlobalDirectives from '@/directives'
 
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
  app.use(store)
  app.use(router)
  app.use(GlobalComponent)
  app.use(GlobalDirectives)
  app.mount('#app')
