import type { DataSrcRegisteredFunc, DataSrcListFunc } from '@api/data'
import state from '@renderer/store/data_src'

// @ts-ignore
const remoteList: ListFunc = async (srcId, filter, page) => {}
// @ts-ignore
const remoteDataSrcRegistered: DataSrcRegisteredFunc = async () => {}

const updateMetaSrc = async () => {
  state.dataSrc.value = await window.api.dataSrcRegistered()
}

const list: ListFunc = (srcId, filter, page) => {
  if (window.api) return window.api.dataSrcList(srcId, filter, page)
  else return remoteList(srcId, filter, page)
}

const updateDataSrc = async () => {
  if (window.api) state.dataSrc.value = await window.api.dataSrcRegistered()
  else state.dataSrc.value = await remoteDataSrcRegistered()
}

export const dataSrc = {
  list,
  updateDataSrc
}
