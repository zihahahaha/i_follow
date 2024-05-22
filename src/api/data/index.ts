import type { DataSrc, DataSrcInfo } from './data'
import { Page } from '../type/common'
import { Filter } from '../type/tag_system'

const dataSrcRegistry: {
  [index: string]: DataSrc
} = {}

export function registerDataSrc(dataSrc: DataSrc) {
  if (dataSrcRegistry[dataSrc.id]) {
    throw `${dataSrc.id} already registered`
  } else {
    dataSrcRegistry[dataSrc.id] = dataSrc
  }
}

export function useDataSrc(): DataSrc[]
export function useDataSrc(id: string): DataSrc | undefined
export function useDataSrc(id?: string) {
  if (id === undefined) return Object.values(dataSrcRegistry)
  else if (dataSrcRegistry[id]) return dataSrcRegistry[id]
  else return undefined
}

export type DataSrcRegisteredFunc = typeof dataSrcRegistered
export async function dataSrcRegistered() {
  const dataSrcInfo: DataSrcInfo[] = []
  for (let dataSrc of Object.values(dataSrcRegistry)) {
    dataSrcInfo.push({
      id: dataSrc.id,
      name: dataSrc.name,
      tags: dataSrc.tags,
      srcPage: dataSrc.srcPage,
      author: dataSrc.author,
      authorPage: dataSrc.authorPage,
      description: dataSrc.description
    })
  }
  return dataSrcInfo
}

export type DataSrcListFunc = typeof dataSrcList
export async function dataSrcList(dataSrcId: string, filter: Filter, page?: Page) {
  const dataSrc = useDataSrc(dataSrcId)
  if (dataSrc) return dataSrc.list(filter, page)
  else throw 'dataSrcId 不存在'
}
