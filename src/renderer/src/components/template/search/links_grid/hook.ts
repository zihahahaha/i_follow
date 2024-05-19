import { throttle } from '@renderer/utils'
import { onMounted, onActivated, onDeactivated } from 'vue'



export function useMediaList(loadInit: Function, wheel: (e: any) => void) {
  onMounted(() => {
    loadInit()
  })

  onActivated(() => {
    document.documentElement.addEventListener('wheel', wheel)
  })
  onDeactivated(() => {
    document.documentElement.removeEventListener('wheel', wheel)
  })
}
