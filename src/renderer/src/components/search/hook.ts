import { ref, watch } from 'vue'
import { popupStyle } from '@renderer/components/common/popuped'
import menu_style from '@renderer/assets/menu.module.css'

export function useSearch(emit) {
  const $style = {  ...menu_style, ...popupStyle }

  const search = ref('')
  watch(search, () => {
    emit('updateSearch', search.value)
  })
  function handleClick(prefix: string) {
    search.value += `${search.value.length == 0 ? '' : ' '}${prefix}:`
  }

  return {
    $style,
    search,
    handleClick
  }
}