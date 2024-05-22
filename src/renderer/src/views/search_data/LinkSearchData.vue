<script setup lang="ts">
import LinkItem from '@renderer/components/link/LinkData.vue'
import { ArrowCircleRight16Regular } from '@vicons/fluent'
//
import { assertIsDefined } from '@renderer/utils/assert'
import { useLoadData } from '@renderer/hook/load_data'
import type { Filter } from '@api/type/tag_system'
import state from '@renderer/store/data_src'
import { dataSrc as api } from '@renderer/api'
import type { DataLink } from '@api/data/data'
import type { Id } from '@api/type/common'
//
const props = defineProps<{
  srcId: string
}>()
const emit = defineEmits<{
  toSearchData: [dataSrcId: string]
  to: [dataSrcId: string, id: Id]
}>()
//
const { data: items, loadData } = useLoadData<DataLink>()
const src = state.dataSrc.value.find((el) => el.id === props.srcId)
assertIsDefined(src)
//
function search(filter: Filter) {
  loadData(10, async () => {
    const res = await api
      .list(props.srcId, filter, { perPage: 10, page: 1 })
      .then((res) => res.items)
      .catch((err) => {
        //handle err
        console.log(err)

        return []
      })
    console.log(res)

    return res
  })
}
defineExpose({
  search
})
</script>

<template src="@renderer/components/link_search/link_search.html"></template>

<style module src="@renderer/components/link_search/link_search.css"></style>
