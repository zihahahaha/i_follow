import type { Downloader, DataLink, PagedDataLink } from './downloader'
import { JSDOM } from 'jsdom'
import * as https from 'node:https'

class DataLinkConstructor implements DataLink {
  id: string
  title: string
  cover: string
  constructor(data: any) {
    this.id = data.path_word
    this.title = data.name
    this.cover = data.cover
  }
}

export const CopyManga: Downloader = {
  id: 'copymanga',
  name: '拷贝漫画',
  tags: [],
  srcPage: 'https://www.copymanga.site',

  //fiter title artist translator
  async list(filter, page) {
    let search: string | undefined
    let type: string | undefined
    let offset = 0
    let limit = 10
    search = filter.find((e) => e.namespace === 'title')?.value
    if (search) type = 'name'
    else {
      search = filter.find((e) => e.namespace === 'artist')?.value
      if (search) type = 'author'
      else {
        search = filter.find((e) => e.namespace === 'translator')?.value
        if (search) type = 'local'
      }
    }
    if (!search || !type) throw 'Filter错误'
    if (page) {
      offset = (page.page - 1) * page.perPage
      limit = page.perPage
    }
    const url = `https://www.copymanga.site/api/kb/web/searchb/comics?q=${search}&q_type=${type}&offset=${offset}`

    return new Promise((resolve, reject) => {
      https
        .get(url, (res) => {
          if (res.statusCode === 200) {
            const data: Uint8Array[] = []
            res.on('data', (chunk) => {
              data.push(chunk)
            })
            res.on('end', () => {
              const body = JSON.parse(Buffer.concat(data).toString()).results
              const res: PagedDataLink = {
                items: [],
                pageInfo: {
                  hasNextPage: body.total > body.limit + body.offset
                }
              }
              for (let i = 0; i < body.list.length; ++i) {
                res.items.push(new DataLinkConstructor(body.list[i]))
              }
              resolve(res)
            })
          } else {
            reject()
          }
        })
        .on('error', () => {
          reject()
        })
    })
  }
}
