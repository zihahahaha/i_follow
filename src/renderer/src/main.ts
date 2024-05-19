import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
//
import { Anilist } from '@renderer/api/anilist'
import { registerMetaSrc } from '@renderer/api'
registerMetaSrc(Anilist)
//
const app = createApp(App)
app.use(router)
app.mount('#app')
