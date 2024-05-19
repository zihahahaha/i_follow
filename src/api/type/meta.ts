import { Tag, Filter, NamespaceLang } from './tag_system'

export type Id = number | string

export interface PageInfo {
  hasNextPage: boolean
}

export interface Page {
  page: number
  perPage: number
}

export interface Meta {
  srcId: string
  id: Id
  title: string
  cover: string
  banner?: string
  description?: string
  tags: Tag[]
}

export interface ThinMeta {
  id: Id
  title: string
  cover: string
}

export interface PagedMeta {
  items: (ThinMeta | Meta)[]
  pageInfo: PageInfo
}

export interface MetaApi {
  id: string
  url: string
  name: string
  list: (filter: Filter, page?: Page) => Promise<PagedMeta>
  get: (id: Id) => Promise<Meta | undefined>
  namespaceLang: () => Promise<NamespaceLang>
}
