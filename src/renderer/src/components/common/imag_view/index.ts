import { createApp } from 'vue'
import ImageView from './ImageView.vue'

export function view(url?: string) {
  if (url === undefined || url === '') return
  const container = document.createElement('div')
  const app = createApp(ImageView, {
    url,
    close: () => {
      app.unmount()
      document.body.removeChild(container)
    }
  })
  app.mount(container)
  document.body.appendChild(container)
}
