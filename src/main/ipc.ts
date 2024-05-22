import { ipcMain } from 'electron'
import type { IpcMainInvokeEvent } from 'electron'

// import { uploadFiles, insert, remove } from '@api/index'
import type { Filter } from '@api/type/tag_system'
import { Page, Id } from '@api/type/common'
import { list as metaSrcList, get as metaSrcGet, metaSrcRegistered } from '@api/metas'
import { dataSrcList, dataSrcRegistered } from '@api/data'

function handleWithError<T>(channel: string, handler: (...args) => Promise<T>) {
  ipcMain.handle(channel, (...args) => {
    return handler(...args)
      .then((res) => {
        return { res }
      })
      .catch((err) => {
        return {
          err
        }
      })
  })
}

// type Tail<T extends any[]> = T extends [infer A, ...infer R] ? R : never
// type exposeType<T extends (e: IpcMainInvokeEvent, ...args) => any> = (
//   ...args: Tail<Parameters<T>>
// ) => ReturnType<T>

// ========meta======
function handleMetaSrcList(__e: IpcMainInvokeEvent, srcId: string, filter: Filter, page?: Page) {
  return metaSrcList(srcId, filter, page)
}

function handleMetaSrcGet(__e: IpcMainInvokeEvent, srcId: string, id: Id) {
  return metaSrcGet(srcId, id)
}

function handleMetaSrcRegistered(__e: IpcMainInvokeEvent) {
  return metaSrcRegistered()
}

// ===========dataSrc==========
function handleDataSrcList(__e: IpcMainInvokeEvent, srcId: string, filter: Filter, page?: Page) {
  return dataSrcList(srcId, filter, page)
}

function handleDataSrcRegistered(__e: IpcMainInvokeEvent) {
  return dataSrcRegistered()
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
  // =====meta=======
  handleWithError('metaSrcList', handleMetaSrcList)
  handleWithError('metaSrcGet', handleMetaSrcGet)
  handleWithError('metaSrcRegistered', handleMetaSrcRegistered)

  // =====dataSrc=======
  handleWithError('dataSrcList', handleDataSrcList)
  handleWithError('dataSrcRegistered', handleDataSrcRegistered)

  // ipcMain.handle('uploadFiles', handleUploadFiles)
  // ipcMain.handle('insert', handleInsert)
  // ipcMain.handle('remove', handleRemove)
}
