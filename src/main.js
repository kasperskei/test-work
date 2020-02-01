import { createApp } from 'vue'
import store from '@/store'
import '@/assets/styles/index.styl'
import App from '@/App.vue'

store.actions.init()

const app = createApp(App)
app.mount('#app')

if (process.env.NODE_ENV === 'development') {
  window.app = app
  window.store = store
}
