import type { MetaApi } from '@api/type/meta'

const apis: {
  [index: string]: MetaApi
} = {}

export function registerMetaSrc(api: MetaApi) {
  if (apis[api.id]) {
    throw `${api.id} already registered`
  } else {
    apis[api.id] = api
  }
}

export function useMetaSrc(): MetaApi[]
export function useMetaSrc(id: string): MetaApi | undefined
export function useMetaSrc(id?: string) {
  if (id === undefined) return Object.values(apis)
  else if (apis[id]) return apis[id]
  else return undefined
}

export function metaSrcRegistered() {
  return Object.keys(apis)
}
