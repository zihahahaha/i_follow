import { ref, computed } from 'vue'

const loadQueue = ref<number[]>([])

function insertQueue() {
  const id = Date.now()
  loadQueue.value.push(id)
  return id
}

function finish(id: number) {
  loadQueue.value.splice(loadQueue.value.indexOf(id), 1)
}

const loading = computed(() => {
  if (loadQueue.value.length === 0) return false
  else return true
})

export { loading, insertQueue, finish }
