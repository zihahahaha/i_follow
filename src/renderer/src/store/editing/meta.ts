import { ref } from 'vue'
import type { Meta, Id, MetaApi } from '@api/type/meta'

interface ReferenceMeta {
  meta: Meta
  src: MetaApi['id']
  id: Id
}

const referenceMeta = ref<ReferenceMeta[]>([])

async function insert(meta: ReferenceMeta) {
  const index = referenceMeta.value.findIndex((e) => e.src === meta.src && e.id === meta.id)
  if (index === -1) return false
  referenceMeta.value.push(meta)
}

function remove(src: MetaApi['id'], id: Id) {
  referenceMeta.value.splice(
    referenceMeta.value.findIndex((e) => e.src === src && e.id === id),
    1
  )
}

function clear() {
  referenceMeta.value = []
}

export default {
  referenceMeta,
  insert,
  remove,
  clear
}
