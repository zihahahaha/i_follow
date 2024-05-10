import * as anilist from './anilist'
import type { GetMedia, GetFunc, SearchResult, SearchFunc } from '@/type'

export enum SourceType {
  anilist = 'anilist'
}

export type Api = {
  get: GetFunc<GetMedia>
  search: SearchFunc<SearchResult>
}

export function assertSourcetype(val: any): asserts val is SourceType {
  if (!Object.keys(SourceType).find((e) => e === val)) {
    throw `媒体来源未定义，接收值： ${val}`
  }
}

export function useApi(type: SourceType): Api {
  switch (type) {
    case SourceType.anilist:
      return anilist
  }
}
