import type { Tag, Filter } from '../type/tag_system'
import { Page, PageInfo } from '../type/page'

export interface DataLink {
  id: string
  title: string
  cover: string
}

export interface PagedDataLink {
  items: DataLink[]
  pageInfo: PageInfo
}

export interface Downloader {
  id: string
  name: string
  tags: Tag[]
  srcPage?: string
  author?: string
  authorPage?: string
  description?: string
  list: (filter: Filter, page?: Page) => Promise<PagedDataLink>
}
