// 定时
export function throttle(wait: number, func: (e: any) => boolean) {
  let last = 0
  return (e: any) => {
    if (Date.now() - last < wait) {
      // console.log('fail', Date.now() - last)
      return
    } else if (func(e)) last = Date.now()
  }
}

// 重计时
export function debounce(wait: number, func: (e: any) => any) {
  let timeId: number | undefined = undefined

  const wrapper = (e?: any) => {
    if (timeId) {
      clearTimeout(timeId)
    }
    timeId = window.setTimeout(func, wait)
  }

  wrapper.cancel = () => {
    clearTimeout(timeId)
  }

  return wrapper
}


