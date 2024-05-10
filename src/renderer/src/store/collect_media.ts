import { ref } from 'vue'
import type { GetMedia } from '@/type'
import { useApi, assertSourcetype } from '@renderer/api'
import { useSystemMessage } from '@renderer/components/system_message'
import { insertQueue, finish } from './loading'

const $message = useSystemMessage()

interface CollectMedia {
  media?: GetMedia
  type: string
  id: number
}

const collect_medias = ref<CollectMedia[]>([])

async function insert(id: number, type: string) {
  assertSourcetype(type)
  const api = useApi(type)
  collect_medias.value.push({
    type,
    id
  })
  const taskId = insertQueue()
  const media = await api.get(id)
  if (media) {
    const target = collect_medias.value.find((e) => e.type === type && e.id === id)
    if (target) {
      target.media = media
    }
    finish(taskId)
  } else {
    $message(0, 'hello')
  }
}

function remove(id: number, type: string) {
  collect_medias.value.splice(
    collect_medias.value.findIndex((e) => e.type === type && e.id === id),
    1
  )
}

function clear() {
  collect_medias.value = []
}

function some(id: number, type: string) {
  return collect_medias.value.some((e) => e.type === type && e.id === id)
}

export default {
  state: collect_medias,
  insert,
  remove,
  clear,
  some
}
