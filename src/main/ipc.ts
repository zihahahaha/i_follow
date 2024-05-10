import { ipcMain } from 'electron'
import type { IpcMainInvokeEvent } from 'electron'

import { search, get, uploadFiles, insert, remove } from './api'
import type { Filter } from '@/type'
import type { InsertMedia } from './api'

// type Tail<T extends any[]> = T extends [infer A, ...infer R] ? R : never
// type exposeType<T extends (e: IpcMainInvokeEvent, ...args) => any> = (
//   ...args: Tail<Parameters<T>>
// ) => ReturnType<T>

export type Search = typeof search
function handleSearch(__e: IpcMainInvokeEvent, filter?: Filter) {
  return search(filter)
}

export type Get = typeof get
function handleGet(__e: IpcMainInvokeEvent, id: number) {
  return get(id)
}

export type UploadFiles = (links: Array<File | string>) => Promise<string[] | undefined>
function handleUploadFiles(__e: IpcMainInvokeEvent, links: string[]) {
  return uploadFiles(links)
}

export type Insert = typeof insert
function handleInsert(__e: IpcMainInvokeEvent, media: InsertMedia) {
  return insert(media)
}

export type Remove = typeof remove
function handleRemove(__e: IpcMainInvokeEvent, id: number) {
  return remove(id)
}

export default () => {
  ipcMain.handle('search', handleSearch)
  ipcMain.handle('get', handleGet)
  ipcMain.handle('uploadFiles', handleUploadFiles)
  ipcMain.handle('insert', handleInsert)
  ipcMain.handle('remove', handleRemove)
}

export type { LocalGetMedia } from './api'
