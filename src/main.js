import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faMoon} from '@fortawesome/free-regular-svg-icons'
import {faSun} from '@fortawesome/free-regular-svg-icons'
import {faListAlt} from '@fortawesome/free-regular-svg-icons'
import {faEyeSlash} from '@fortawesome/free-regular-svg-icons'
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import { plugin, defaultConfig } from '@formkit/vue'

library.add(faMoon,faSun,faListAlt,faEyeSlash,faXmark)
createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(plugin, defaultConfig)
.mount('#app')