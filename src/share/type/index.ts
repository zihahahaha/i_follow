export type Tag = {
  namespace: string
  value: string
}

//=====search=====
export type Filter = {
  tags?: Tag[]
  paging?: {
    page: number
    perPage: number
  }
}

export interface SearchMedia {
  id: number
  title: string
  cover: string
}

export type PageInfo = {
  [info: string]: any
  hasNextPage: boolean
}

export type SearchResult = {
  medias: SearchMedia[]
  pageInfo: PageInfo
}

export type SearchFunc<T extends SearchResult> = (filter?: Filter) => Promise<T>

//=====get=====
type NamespaceLang = {
  [namespace: string]: string
}
export interface GetMedia {
  id: number
  title: string
  cover: string
  banner: string
  description: string
  tags: Tag[]
  namespaceLang?: NamespaceLang
}

export type GetFunc<T extends GetMedia> = (id: number) => Promise<T | undefined>



