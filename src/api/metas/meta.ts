import { Tag, Filter, NamespaceLang } from '../type/tag_system'
import { Page, PageInfo } from '../type/page'

export type Id = number | string

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

export interface MetaSrcInfo {
  id: string
  name: string
  namespaceLang: NamespaceLang
  
  link?: string
}

export interface MetaSrc extends MetaSrcInfo {
  list: (filter: Filter, page?: Page) => Promise<PagedMeta>
  get: (id: Id) => Promise<Meta | undefined>
}
