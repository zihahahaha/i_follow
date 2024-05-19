<script setup lang="ts">
import LinkMeta from '@renderer/components/link/LinkMeta.vue'
import { ArrowCircleRight16Regular } from '@vicons/fluent'
//
import { assertIsDefined } from '@renderer/utils/assert'
import { useLoadData } from '@renderer/hook/load_data'
import type { ThinMeta, Meta, Id } from '@api/metas/meta'
import type { Filter } from '@api/type/tag_system'
import state from '@renderer/store/metaSrc'
import { list } from '@renderer/api'
//
const props = defineProps<{
  srcId: string
}>()
const emit = defineEmits<{
  toSrc: [srcId: string]
  view: [meta: Meta]
  paramView: [srcId: string, id: Id]
}>()
//
const { data: items, loadData } = useLoadData<Meta | ThinMeta>()
const metaSrc = state.metaSrc.value.find((el) => el.id === props.srcId)
assertIsDefined(metaSrc)
//
function search(filter: Filter) {
  loadData(10, async () => {
    const res = await list(props.srcId, filter, { perPage: 10, page: 1 })
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
function handleTo(meta: Meta | ThinMeta) {
  if ('tags' in meta) emit('view', meta)
  else emit('paramView', props.srcId, meta.id)
}
</script>

<template>
  <div :class="$style.src_link">
    <div :class="$style.src">
      <div :class="$style.src_title">{{ metaSrc.name }}</div>
      <button type="button" :class="$style.more_button" @click="emit('toSrc', props.srcId)">
        <ArrowCircleRight16Regular />
      </button>
    </div>
    <div :class="$style.link" v-if="items.length > 0">
      <LinkMeta v-for="item in items" :meta="item.item" @to="handleTo(item.item!)" />
    </div>
  </div>
</template>

<style module>
.src_link {
  background-color: #eff0f3;
  margin: 5px 10px;
  border-radius: 8px;
}
.src {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}
.src_title {
  font-size: 25px;
  font-weight: 700;
  min-width: 100px;
}
.link {
  display: flex;
  flex-wrap: nowrap;
  gap: 15px;
  overflow: auto;
  padding: 5px 15px;
}
.more_button {
  border: none;
  width: 25px;
  height: 25px;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  border-radius: 100%;
}
.more_button:hover {
  background-color: #ff8e3c;
  color: #fff;
}
</style>
