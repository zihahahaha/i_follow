import type {
  SearchMedia,
  SearchFunc,
  PageInfo,
  SearchResult,
  GetMedia,
  GetFunc,
  Tag
} from '@/type'

const url = 'https://graphql.anilist.co'

//=====search=======
// 现在只支持搜索标题，且不支持多标签查询
class SearchMediaConstructor implements SearchMedia {
  id: number
  title: string
  cover: string

  constructor(data) {
    this.id = data.id
    this.title = data.title.native
    this.cover = data.coverImage.large
  }
}
interface AniListPageInfo extends PageInfo {
  currentPage: number
  lastPage: number
  perPage: number
  total: number
}

interface AniListSearchResult extends SearchResult {
  pageInfo: AniListPageInfo
}
const search: SearchFunc<AniListSearchResult> = async (filter = {}) => {
  const query = `
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
          extraLarge
          large
          medium
        }
      }
    }
  }
    `

  const title = filter.tags?.find((e) => e.namespace === 'title' || e.namespace === 'temp')?.value
  const variable = {
    title,
    page: filter?.paging?.page,
    perPage: filter?.paging?.perPage
  }

  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: variable
    })
  }

  let response
  try {
    response = await fetch(url, option)
  } catch (err) {
    console.log('header', err)
  }

  let body
  try {
    body = (await response.json()).data.Page
  } catch (err) {
    console.log('body', err)
  }

  console.log(filter.paging)
  console.log(body)

  const res: AniListSearchResult = {
    medias: [],
    pageInfo: body.pageInfo
  }

  // 搜索不到的情况body.media为[]
  for (let i = 0; i < body.media.length; ++i) {
    res.medias.push(new SearchMediaConstructor(body.media[i]))
  }

  return res
}

//=====get=====
class AniListGetMediaConstructor implements GetMedia {
  id: number
  title: string
  cover: string
  banner: string
  description: string
  tags: Tag[] = []
  namespaceLang = {}

  constructor(data) {
    this.id = data.id
    this.title = data.title.native
    this.cover = data.coverImage.large
    this.banner = data.bannerImage ? data.bannerImage : data.coverImage.large
    this.description = data.description
    //title
    const title = 'title'
    this.namespaceLang[title] = '标题'
    this.tags.push({
      namespace: title,
      value: `${data.title.romaji}(romaji)`
    })
    this.tags.push({
      namespace: title,
      value: `${data.title.english}(english)`
    })
    this.tags.push({
      namespace: title,
      value: `${data.title.native}(native)`
    })
    //startDate
    const startDate = 'startDate'
    this.namespaceLang[startDate] = '连载开始'
    this.tags.push({
      namespace: startDate,
      value: data.startDate.year
        ? `${data.startDate.year}-${data.startDate.month}-${data.startDate.day}`
        : 'NO DATA'
    })
    //endDate
    const endDate = 'endDate'
    this.namespaceLang[endDate] = '连载结束'
    this.tags.push({
      namespace: endDate,
      value: data.endDate.year
        ? `${data.endDate.year}-${data.endDate.month}-${data.endDate.day}`
        : 'NO DATA'
    })
    // chapters
    const chapters = 'chapters'
    this.namespaceLang[chapters] = '话数'
    this.tags.push({
      namespace: chapters,
      value: data.chapters ? data.chapters : 'NO DATA'
    })
    //volumes
    const volumes = 'volumes'
    this.namespaceLang[volumes] = '卷数'
    this.tags.push({
      namespace: volumes,
      value: data.volumes ? data.volumes : 'NO DATA'
    })
  }
}
const get: GetFunc<GetMedia> = async (id) => {
  const query = `
  query($id: Int) { 
    Media(id: $id, type: MANGA) {
      id
    	 title {
      	romaji
      	english
      	native
      }
      coverImage {
        extraLarge
        large
        medium
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
    `

  const variable = {
    id
  }

  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: variable
    })
  }

  let response
  try {
    response = await fetch(url, option)
  } catch (err) {
    console.log('header', err)
  }

  let data
  try {
    data = (await response.json()).data.Media
  } catch (err) {
    console.log('body', err)
  }

  console.log(id)
  console.log(data)

  if (data) return new AniListGetMediaConstructor(data)
  else return undefined
}
export { search, get }
