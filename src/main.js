import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.mount('#app')