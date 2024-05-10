import { type Component, markRaw, ref } from 'vue'

export function useMessage(timeout?: number) {
  const messages = ref<
    Array<{
      component: Component
      props: any
    }>
  >([])

  const message = (component: Component, props: any, keyed: boolean = true) => {
    let item = {
      component: markRaw(component),
      props
    }
    if (keyed) {
      item.props.key = Date.now()
    }
    messages.value.push(item)
    item = messages.value[messages.value.length - 1]
    function close() {
      console.log('close', item)

      messages.value.splice(
        messages.value.findIndex((e) => e === item),
        1
      )
    }
    item.props.close = close
    if (timeout && typeof timeout === 'number') {
      setTimeout(close, timeout)
    }
  }

  return {
    message,
    messages
  }
}
