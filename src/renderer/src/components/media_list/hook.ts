import { throttle } from '@renderer/utils'
import { onMounted, onActivated, onDeactivated } from 'vue'

export function useWheelEvent(loadExtra: (...args) => Promise<void>) {
  const wheel = throttle(500, (e: WheelEvent) => {
    if (e.deltaY < 0) return false
    const target = e.currentTarget as HTMLElement

    // 愚蠢的浏览器兼容性
    if (target.scrollTop === target.scrollHeight - target.clientHeight) {
      console.log('load extra')

      loadExtra()
      return true
    }
    return false
  })

  return wheel
}

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
