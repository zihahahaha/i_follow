import type { ListFunc, GetFunc, MetaSrcRegisteredFunc } from '@api/metas'
import state from '@renderer/store/meta_src'

// @ts-ignore
const remoteGet: GetFunc = async (srcId, id) => {}
// @ts-ignore
const remoteList: ListFunc = async (srcId, filter, page) => {}
// @ts-ignore
const remoteMtaSrcRegistered: MetaSrcRegisteredFunc = async () => {}

const updateMetaSrc = async () => {
  if (window.api) state.metaSrc.value = await window.api.metaSrcRegistered()
  else state.metaSrc.value = await remoteMtaSrcRegistered()
}

const list: ListFunc = (srcId, filter, page) => {
  if (window.api) return window.api.metaSrcList(srcId, filter, page)
  else return remoteList(srcId, filter, page)
}

const get: GetFunc = (srcId, id) => {
  if (window.api) return window.api.metaSrcGet(srcId, id)
  else return remoteGet(srcId, id)
}

export const metaSrc = {
  get,
  list,
  updateMetaSrc
}
