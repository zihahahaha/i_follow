import { contextBridge, ipcRenderer } from 'electron'
import type { Search, Get, UploadFiles, Insert, Remove } from '../main/ipc'

const search: Search = (filter) => ipcRenderer.invoke('search', filter)
const get: Get = (id) => ipcRenderer.invoke('get', id)
const uploadFiles: UploadFiles = (links) => {
  let files: string[] = []
  for (let link of links) {
    if (typeof link === 'string') files.push(link)
    else links.push(link.path)
  }
  return ipcRenderer.invoke('uploadFiles', files)
}
const insert: Insert = (media) => ipcRenderer.invoke('insert', media)
const remove: Remove = (id) => ipcRenderer.invoke('remove', id)

const api = {
  search,
  get,
  uploadFiles,
  insert,
  remove
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
