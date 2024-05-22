import type { Tag, Filter } from '../type/tag_system'
import { Page, PageInfo } from '../type/common'

import type { Id } from '../type/common'

export interface DataLink {
  id: Id
  title: string
  cover: string
}

export interface PagedDataLink {
  items: DataLink[]
  pageInfo: PageInfo
}

export interface DataSrcInfo {
  id: string
  name: string
  tags: Tag[]
  srcPage?: string
  author?: string
  authorPage?: string
  description?: string
}

export interface DataSrc extends DataSrcInfo {
  list: (filter: Filter, page?: Page) => Promise<PagedDataLink>
}
