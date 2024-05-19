import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as stream from 'node:stream/promises'
import { imgs } from './config'
import { downloadFile } from './utils'

import type { SearchFunc, GetFunc, UploadFilesFunc, RemoveFunc, InsertFunc } from '../../buffer/type'
import type { SearchMedia, SearchResult, GetMedia } from '../../buffer/type'

const prisma = new PrismaClient()

//====search=====
export interface LocalSearchMedia extends SearchMedia {}
export interface LocalSearchResult extends SearchResult {
  medias: LocalSearchMedia[]
}
const search: SearchFunc<LocalSearchResult> = async (filter = {}) => {
  const tags = filter?.tags ? filter.tags : []

  // for every namspace n,every tag t in n,exist tag s contain t
  const AND = tags.map((tag) => {
    const case1 =
      tag.namespace === 'title' || tag.namespace === 'temp'
        ? { title: { contains: tag.value } }
        : {}
    const case2 = {
      tags: {
        some:
          tag.namespace === 'temp'
            ? {
                value: {
                  contains: tag.value
                }
              }
            : {
                namespace: tag.namespace,
                value: {
                  contains: tag.value
                }
              }
      }
    }
    return {
      OR: [case1, case2]
    }
  })
  // console.dir(AND, {
  //   depth: null
  // })

  const medias = await prisma.comic.findMany({
    select: {
      id: true,
      title: true,
      cover: true
    },
    where: {
      AND
    }
  })

  return {
    medias,
    pageInfo: {
      hasNextPage: false
    }
  }
}

//======get=====
export interface LocalGetMedia extends GetMedia {
  creat: bigint
}
const get: GetFunc<LocalGetMedia> = async (id) => {
  console.log(id)

  const media = await prisma.comic.findUnique({
    where: {
      id
    },
    include: {
      tags: {
        select: {
          namespace: true,
          value: true
        }
      }
    }
  })

  if (media) {
    return {
      id: media.id,
      title: media.title,
      creat: media.create,
      cover: media.cover,
      banner: media.banner,
      description: media.description,
      tags: media.tags
    }
  } else return undefined
}

export { search, get }

//====uploadFile=====
async function uploadFiles(links: string[]): Promise<string[] | undefined> {
  console.log(links)
  const files: string[] = []

  for (let link of links) {
    let url = new URL(link)
    if (url.protocol === 'https:' || url.protocol === 'http') {
      const file = await downloadFile(link).catch((err) => {
        console.log(err)
        return undefined
      })
      if (file === undefined) break
      else files.push(file)
    } else {
      const fileName = `imgs/${uuidv4()}${path.parse(link).ext}`
      const src = fs.createReadStream(link)
      const dst = fs.createWriteStream(`${imgs}${fileName}`)
      const file = await stream
        .pipeline(src, dst)
        .then(() => fileName)
        .catch((err) => {
          console.log(err)
          return undefined
        })
      if (file === undefined) break
      else files.push(file)
    }
  }

  if (files.length !== links.length) {
    for (let file of files)
      fs.unlink(`${imgs}${file}`, (err) => {
        console.log(err)
      })
    return undefined
  } else return files
}

//====insert=====
const insert: InsertFunc = async (media) => {
  console.log(media)

  const data = {
    title: media.title,
    cover: media.cover,
    banner: media.banner,
    description: media.description,
    create: Date.now(),

    tags: {
      create: media.tags
    }
  }

  return prisma.comic.create({
    data,
    include: {
      tags: {
        select: {
          namespace: true,
          value: true
        }
      }
    }
  })
}

//=====remove=====
const remove: RemoveFunc = async (id) => {
  console.log(`remove ${id}`)

  const deleteTags = prisma.tag.deleteMany({
    where: {
      comicId: id
    }
  })
  const deleteMedia = prisma.comic.delete({
    where: {
      id
    }
  })
  const deletedMedia = (await prisma.$transaction([deleteTags, deleteMedia]))[1]

  fs.unlink(`${imgs}${deletedMedia.banner}`, (err) => {
    console.log(err)
  })
  fs.unlink(`${imgs}${deletedMedia.cover}`, (err) => {
    console.log(err)
  })

  return true
}

export { uploadFiles, insert, remove }
