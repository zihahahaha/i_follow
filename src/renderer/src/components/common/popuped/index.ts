import { onDeactivated, ref } from 'vue'
import popupedStyle from './popuped.module.css'
import popupStyle from './popup.module.css'

export function usePopuped() {
  const flag = ref(false)

  const close = () => {
    // 将mousedown延后到click事件触发
    setTimeout(() => {
      flag.value = false
    }, 100)
  }

  function updateFlag(value: boolean) {
    flag.value = value
    if (value === true) {
      window.addEventListener('mousedown', close, {
        once: true
      })
    } else {
      window.removeEventListener('mousedown', close)
    }
  }

  onDeactivated(() => {
    window.removeEventListener('mousedown', close)
  })

  return {
    flag,
    updateFlag,
    popupedStyle
  }
}

export { popupStyle, popupedStyle }
