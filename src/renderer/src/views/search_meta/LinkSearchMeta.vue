<script setup lang="ts">
import LinkItem from '@renderer/components/link/LinkMeta.vue'
import { ArrowCircleRight16Regular } from '@vicons/fluent'
//
import { assertIsDefined } from '@renderer/utils/assert'
import { useLoadData } from '@renderer/hook/load_data'
import type { ThinMeta, Meta } from '@api/metas/meta'
import type { Id } from '@api/type/common'
import type { Filter } from '@api/type/tag_system'
import state from '@renderer/store/meta_src'
import { metaSrc as api } from '@renderer/api'
//
const props = defineProps<{
  srcId: string
}>()
const emit = defineEmits<{
  toSearch: [srcId: string]
  view: [meta: Meta]
  paramView: [srcId: string, id: Id]
}>()
//
const { data: items, loadData } = useLoadData<Meta | ThinMeta>()
const src = state.metaSrc.value.find((el) => el.id === props.srcId)
assertIsDefined(src)
//
function search(filter: Filter) {
  loadData(10, async () => {
    const res = await api
      .list(props.srcId, filter, { perPage: 10, page: 1 })
      .then((res) => res.items)
      .catch((err) => {
        //handle err
        return []
      })
    console.log(res)

    return res
  })
}
defineExpose({
  search
})
//
function handleToSearch() {
  emit('toSearch', props.srcId)
}
//
function handleTo(meta: Meta | ThinMeta) {
  if ('tags' in meta) emit('view', meta)
  else emit('paramView', props.srcId, meta.id)
}
</script>

<template src="@renderer/components/link_search/link_search.html"></template>

<style module src="@renderer/components/link_search/link_search.css"></style>
