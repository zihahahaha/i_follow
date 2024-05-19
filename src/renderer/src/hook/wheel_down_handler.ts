import { throttle } from '@renderer/utils'

export function useWheelDownHandler(trigger: Function) {
  const wheel = throttle(500, (e: WheelEvent) => {
    if (e.deltaY < 0) return false
    const target = e.currentTarget as HTMLElement

    // 愚蠢的浏览器兼容性
    if (target.scrollTop === target.scrollHeight - target.clientHeight) {
      trigger()
      return true
    }
    return false
  })

  return wheel
}
