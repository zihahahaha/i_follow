export interface PageInfo {
  hasNextPage: boolean
}

export interface Page {
  page: number
  perPage: number
}

export type Id = number | string
