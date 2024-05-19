import {
  onMounted as __onMounted,
  onActivated as __onActived,
  onDeactivated as __onDeactived,
  onUnmounted as __onUnmounted
} from 'vue'

export function useCompatibleLifecycle() {
  let flag = false
  return {
    onMounted(callback: () => void) {
      __onMounted(() => {
        callback()
        flag = true
      })
    },
    onActivated(callback: () => void) {
      __onActived(() => {
        if (!flag) callback()
      })
    },
    onDeactivated(callback: () => void) {
      __onDeactived(() => {
        callback()
        flag = false
      })
    },
    onUnmounted(callback: () => void) {
      __onUnmounted(() => {
        if (flag) callback()
      })
    }
  }
}
