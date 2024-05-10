import { ref } from 'vue'
import { router } from '@renderer/router'

export const errorMessage = ref<string>()

export function error(mesage: string) {
  errorMessage.value = mesage
  router.replace({
    name: 'error'
  })
}
