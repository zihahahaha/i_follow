import { ref, Ref } from 'vue'

export const radioFactory = () => {
  const registry: Ref<boolean>[] = []
  const radio = () => {
    const flag = ref(false)
    registry.push(flag)
    return {
      emit: () => {
        for (let e of registry) {
          if (e === flag) {
            e.value = true
          } else {
            e.value = false
          }
        }
      },
      flag
    }
  }
  radio.all = (flag: boolean) => {
    for (let i = 0; i < registry.length; ++i) {
      registry[i].value = flag
    }
  }
  return radio
}
