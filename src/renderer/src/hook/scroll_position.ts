import { onActivated, onDeactivated } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

export function useScrollPosition() {
  let scrollTop: number
  onActivated(() => {
    console.log('active', scrollTop)
    window.scrollTo(0, scrollTop)
  })
  onBeforeRouteLeave(() => {
    scrollTop = document.documentElement.scrollTop
    console.log('dead', scrollTop)
  })
}
