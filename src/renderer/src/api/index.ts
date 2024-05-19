import type { MetaSrcRegisteredFunc, ListFunc, GetFunc } from '@api/metas'
import type { MetaSrc, MetaSrcInfo } from '@api/metas/meta'

import state from '@renderer/store/metaSrc'

export const updateMetaSrc = async () => {
  console.log(window.api)

  state.metaSrc.value = await window.api.metaSrcRegistered()
}

export const list: ListFunc = (srcId, filter, page) => {
  return window.api.list(srcId, filter, page)
}

export const get: GetFunc = (srcId, id) => {
  return window.api.get(srcId, id)
}
