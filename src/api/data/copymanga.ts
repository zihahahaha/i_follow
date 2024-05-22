import type { DataSrc, DataLink, PagedDataLink } from './data'
import { JSDOM } from 'jsdom'
import * as https from 'node:https'

// ====api记录======
/*
baseUrl: https://www.copymanga.site/api/kb/web/searchb/comics
header: {
  accept?: 'text/html' | 'application/json'
} = {
  accept:'application/json'
}
params: {
  q:string .length > 0
  q_type?:'name' | 'author' | 'local' | ''
  offset?:number 
  limit?:number <= 30
} = {
  q_type:''
  offset:0
  limit:20
}
*/

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

export const CopyManga: DataSrc = {
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
    search = filter.find((e) => e.namespace === 'title' || e.namespace === 'temp')?.value
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

    console.log(url)

    return new Promise((resolve, reject) => {
      https
        .get(url, (res) => {
          if (res.statusCode === 200) {
            const data: Uint8Array[] = []
            res.on('data', (chunk) => {
              data.push(chunk)
            })
            res.on('end', () => {
              console.log('end=========')

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
            res.on('error', () => {
              console.log('error1======')

              reject('res error')
            })
          } else {
            console.log(res.statusCode)
            res.destroy()
            reject('statuscode')
          }
        })
        .on('error', () => {
          console.log('error2======')
          reject('request error')
        })
    })
  }
}
