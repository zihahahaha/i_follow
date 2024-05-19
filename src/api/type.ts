export type Tag = {
  namespace: string
  value: string
}

//=====search=====
export type PageInfo = {
  [info: string]: any
  hasNextPage: boolean
}
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

//=====uploadFiles======
export type UploadFilesFunc = (links: Array<File | string>) => Promise<string[] | undefined>

//=====insert=======
export type InsertMedia = {
  title: string
  cover: string
  banner: string
  description: string
  tags: Tag[]
}
export type InsertedMedia = {
  id: number
  create: bigint
  title: string
  cover: string
  banner: string
  tags: Tag[]
}
export type InsertFunc = (media: InsertMedia) => Promise<InsertedMedia | undefined>

//======remove========
export type RemoveFunc = (id: number) => Promise<boolean>