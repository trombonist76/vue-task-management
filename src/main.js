import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import './style.css'

const app = createApp(App)
const pinia = createPinia()
app.use(plugin, defaultConfig)
app.use(pinia)
app.mount('#app')