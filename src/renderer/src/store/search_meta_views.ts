import { ref } from 'vue'

type MetaSearchView = {
  name: string
  srcId: string
  search: string
}

const views = ref<MetaSearchView[]>([])

function insert(view: MetaSearchView) {
  const index = views.value.findIndex((v) => v.srcId === view.srcId)
  if (index === -1) {
    views.value.push(view)
  } else {
    views.value[index].search = view.search
  }
}

function remove(srcId: string) {
  const index = views.value.findIndex((v) => v.srcId === srcId)
  if (index !== -1) {
    views.value.splice(index, 1)
  }
}

export default { views, insert, remove }
