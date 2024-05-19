import type { GetMedia } from "@api/type"

interface BufferMedia extends GetMedia {
  type: string
}

const buffer: BufferMedia[] = []
const maxSize = 5

function find(id: number, type: string) {
  return buffer.find((e) => e.id === id && e.type === type)
}

function insert(media: GetMedia, type: string) {
  if (buffer.length === maxSize) buffer.shift()
  buffer.push({
    ...media,
    type
  })
}

export default {
  find,
  insert
}
