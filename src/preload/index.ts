import { contextBridge, ipcRenderer } from 'electron'
// import type { SearchFunc, GetFunc, RemoveFunc, InsertFunc, UploadFilesFunc } from '@api/type'
// import type { LocalSearchResult, LocalGetMedia } from '@api/api'
import type { ListFunc, GetFunc, MetaSrcRegisteredFunc } from '@api/metas'
import type { DataSrcListFunc, DataSrcRegisteredFunc } from '@api/data'

async function invokeWithError(channel: string, ...args) {
  const { res, err } = await ipcRenderer.invoke(channel, ...args)
  if (res) return res
  else throw err
}

// ====metaSrc======
const metaSrcList: ListFunc = (srcId, filter) => invokeWithError('metaSrcList', srcId, filter)
const metaSrcGet: GetFunc = (srcId, id) => invokeWithError('metaSrcGet', srcId, id)
const metaSrcRegistered: MetaSrcRegisteredFunc = () => invokeWithError('metaSrcRegistered')

// =======dataSrc=========
const dataSrcList: DataSrcListFunc = (srcId, filter) =>
  invokeWithError('dataSrcList', srcId, filter)
const dataSrcRegistered: DataSrcRegisteredFunc = () => invokeWithError('dataSrcRegistered')

// const uploadFiles: UploadFilesFunc = (links) => {
//   let files: string[] = []
//   for (let link of links) {
//     if (typeof link === 'string') files.push(link)
//     else links.push(link.path)
//   }
//   return ipcRenderer.invoke('uploadFiles', files)
// }
// const insert: InsertFunc = (media) => ipcRenderer.invoke('insert', media)
// const remove: RemoveFunc = (id) => ipcRenderer.invoke('remove', id)

const api = {
  metaSrcList,
  metaSrcGet,
  metaSrcRegistered,

  dataSrcList,
  dataSrcRegistered
  // uploadFiles,
  // insert,
  // remove
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api
}

declare global {
  interface Window {
    api: typeof api
  }
}
