import { contextBridge, ipcRenderer } from 'electron'
// import type { SearchFunc, GetFunc, RemoveFunc, InsertFunc, UploadFilesFunc } from '@api/type'
// import type { LocalSearchResult, LocalGetMedia } from '@api/api'
import type { ListFunc, GetFunc, MetaSrcRegisteredFunc } from '@api/metas'

const list: ListFunc = (srcId, filter) => ipcRenderer.invoke('list', srcId, filter)
const get: GetFunc = (srcId, id) => ipcRenderer.invoke('get', srcId, id)
const metaSrcRegistered: MetaSrcRegisteredFunc = () => ipcRenderer.invoke('metaSrcRegistered')
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
  list,
  get,
  metaSrcRegistered
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
