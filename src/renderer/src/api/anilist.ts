import type { MetaApi, Page, Id, Meta, PagedMeta } from '@api/type/meta'
import type { Filter, Tag } from '@api/type/tag_system'

class MetaConstructor implements Meta {
  srcId: string
  id: number
  title: string
  cover: string
  banner: string
  description: string
  tags: Tag[] = []

  constructor(srcId: string, data) {
    this.srcId = srcId
    this.id = data.id
    this.title = data.title.native
    this.cover = data.coverImage.large
    this.banner = data.bannerImage
    this.description = data.description

    //title
    this.tags.push({
      namespace: 'title',
      value: `${data.title.romaji}(romaji)`
    })
    this.tags.push({
      namespace: 'title',
      value: `${data.title.english}(english)`
    })
    this.tags.push({
      namespace: 'title',
      value: `${data.title.native}(native)`
    })
    //startDate
    if (data.startDate.year && data.startDate.month && data.startDate.day)
      this.tags.push({
        namespace: 'startDate',
        value: `${data.startDate.year}-${data.startDate.month}-${data.startDate.day}`
      })
    //endDate
    if (data.endDate.year && data.endDate.mont && data.endDate.day)
      this.tags.push({
        namespace: 'endDate',
        value: `${data.endDate.year}-${data.endDate.month}-${data.endDate.day}`
      })
    // chapters
    if (data.chapters)
      this.tags.push({
        namespace: 'chapters',
        value: data.chapters
      })
    //volumes
    this.tags.push({
      namespace: 'volumes',
      value: data.volumes
    })
  }
}

const listQuery = `
query($title: String, $page: Int, $perPage: Int)  {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (search: $title, type: MANGA, isAdult: false) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        large
      }
      bannerImage
      description
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      chapters
      volumes
    }
  }
}
  `

export const Anilist: MetaApi = {
  id: 'anilist',
  name: 'AniList',
  url: 'https://graphql.anilist.co',

  // 现在只支持搜索标题，且不支持多标签查询
  // title 搜索undefined与''结果是不一样的
  async list(filter: Filter, page?: Page) {
    console.log(`${this.name} api:list`, filter, page)

    const variables = {
      title: filter.find((e) => e.namespace === 'title' || e.namespace === 'temp')?.value,
      page: page ? page.page : 10,
      perPage: page ? page.perPage : 1
    }

    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: listQuery,
        variables
      })
    }

    const response = await fetch(this.url, option)
    if (!response.ok) throw 'error'
    const body = (
      await response.json().catch((err) => {
        throw err
      })
    ).data.Page

    console.log('return body:', body)

    const res: PagedMeta = {
      items: [],
      pageInfo: body.pageInfo
    }

    // 搜索不到的情况body.media为[]
    for (let i = 0; i < body.media.length; ++i) {
      res.items.push(new MetaConstructor(this.id, body.media[i]))
    }

    return res
  },

  async get(id: Id) {
    return undefined
  },

  async namespaceLang() {
    return {
      title: '标题',
      startDate: '连载开始',
      endDate: '连载结束',
      chapters: '章节数',
      volumes: '卷数'
    }
  }
}
