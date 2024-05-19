import type { Downloader } from './downloader'
import { Page } from '../type/page'
import { Filter } from '../type/tag_system'

const apis: {
  [index: string]: Downloader
} = {}

export function registerMetaSrc(api: Downloader) {
  if (apis[api.id]) {
    throw `${api.id} already registered`
  } else {
    apis[api.id] = api
  }
}

export function useMetaSrc(): Downloader[]
export function useMetaSrc(id: string): Downloader | undefined
export function useMetaSrc(id?: string) {
  if (id === undefined) return Object.values(apis)
  else if (apis[id]) return apis[id]
  else return undefined
}

export async function list(downloaderId: string, filter: Filter, page?: Page) {
  const api = useMetaSrc(downloaderId)
  if (api) return api.list(filter, page)
  else throw 'downloaderId 不存在'
}
