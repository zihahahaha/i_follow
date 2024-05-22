import type { Filter } from '../type/tag_system'
import type { MetaSrc, MetaSrcInfo } from './meta'
import { Page, Id } from '../type/common'

const metaSrcRegistry: {
  [index: string]: MetaSrc
} = {}

export function registerMetaSrc(metaSrc: MetaSrc) {
  if (metaSrcRegistry[metaSrc.id]) {
    throw `${metaSrc.id} already registered`
  } else {
    metaSrcRegistry[metaSrc.id] = metaSrc
  }
}

export function useMetaSrc(): MetaSrc[]
export function useMetaSrc(id: string): MetaSrc | undefined
export function useMetaSrc(id?: string) {
  if (id === undefined) return Object.values(metaSrcRegistry)
  else if (metaSrcRegistry[id]) return metaSrcRegistry[id]
  else return undefined
}

export type MetaSrcRegisteredFunc = typeof metaSrcRegistered
export async function metaSrcRegistered() {
  const metaSrcInfo: MetaSrcInfo[] = []
  for (let metaSrc of Object.values(metaSrcRegistry)) {
    metaSrcInfo.push({
      id: metaSrc.id,
      name: metaSrc.name,
      namespaceLang: metaSrc.namespaceLang,
      link: metaSrc.link
    })
  }
  return metaSrcInfo
}

export type ListFunc = typeof list
export async function list(srcId: string, filter: Filter, page?: Page) {
  const api = useMetaSrc(srcId)
  if (api) return api.list(filter, page)
  else throw 'metaSrcId 不存在'
}

export type GetFunc = typeof get
export async function get(srcId: string, id: Id) {
  const api = useMetaSrc(srcId)
  if (api) return api.get(id)
  else throw 'metaSrcId 不存在'
}
