import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { metaSrc, dataSrc } from './api'
//
metaSrc.updateMetaSrc()
dataSrc.updateDataSrc()
const app = createApp(App)
app.use(router)
app.mount('#app')
