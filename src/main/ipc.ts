import { ipcMain } from 'electron'
import type { IpcMainInvokeEvent } from 'electron'

import { uploadFiles, insert, remove } from '@api/index'
import type { Filter } from '@api/type/tag_system'
import { Page } from '@api/type/page'
import { list, get, metaSrcRegistered } from '@api/metas'
import { Id } from '@api/metas/meta'

// type Tail<T extends any[]> = T extends [infer A, ...infer R] ? R : never
// type exposeType<T extends (e: IpcMainInvokeEvent, ...args) => any> = (
//   ...args: Tail<Parameters<T>>
// ) => ReturnType<T>

function handleList(__e: IpcMainInvokeEvent, srcId: string, filter: Filter, page?: Page) {
  return list(srcId, filter, page)
}

function handleGet(__e: IpcMainInvokeEvent, srcId: string, id: Id) {
  return get(srcId, id)
}

function handleMetaSrcRegistered(__e: IpcMainInvokeEvent) {
  return metaSrcRegistered()
}

// export type UploadFiles = (links: Array<File | string>) => Promise<string[] | undefined>
// function handleUploadFiles(__e: IpcMainInvokeEvent, links: string[]) {
//   return uploadFiles(links)
// }

// function handleInsert(__e: IpcMainInvokeEvent, media: InsertMedia) {
//   return insert(media)
// }

// function handleRemove(__e: IpcMainInvokeEvent, id: number) {
//   return remove(id)
// }

export default () => {
  ipcMain.handle('list', handleList)
  ipcMain.handle('get', handleGet)
  ipcMain.handle('metaSrcRegistered', handleMetaSrcRegistered)

  // ipcMain.handle('uploadFiles', handleUploadFiles)
  // ipcMain.handle('insert', handleInsert)
  // ipcMain.handle('remove', handleRemove)
}
