import { ref, computed } from 'vue'
import type { Tag } from '@node/type'
import { insertQueue, finish } from './loading'
import { api } from '@renderer/api/local'

const editMedia = {
  id: ref<number>(),
  title: ref<string>(),
  tags: ref<Tag[]>([]),
  cover: ref<string | File>(),
  banner: ref<string | File>(),
  description: ref<string>()
}

async function set(id: number) {
  const taskId = insertQueue()
  const media = await api.get(id)
  if (media) {
    editMedia.id.value = media.id
    editMedia.banner.value = media.banner
    editMedia.description.value = media.description
    editMedia.cover.value = media.cover
    editMedia.tags.value = media.tags
    editMedia.title.value = media.title
  }
  finish(taskId)
}

const editFlag = computed(() => {
  if (
    editMedia.banner.value ||
    editMedia.cover.value ||
    (editMedia.description.value && editMedia.description.value.length > 0) ||
    editMedia.id.value ||
    editMedia.tags.value.length > 0 ||
    (editMedia.title.value && editMedia.title.value?.length > 0)
  )
    return true
  else return false
})

export default {
  state: editMedia,
  editFlag,
  set
}
