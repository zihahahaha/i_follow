<script setup lang="ts">
import LinkMeta from '@renderer/components/link/LinkMeta.vue'
import Topbar from '@renderer/components/common/topbar'
import InputSearch from './InputSearch.vue'
import { Options, InformationOutline } from '@vicons/ionicons5'
import { Rocket16Filled } from '@vicons/fluent'
import Overlay from '@renderer/components/view/Overlay.vue'
import Dialog from '@renderer/components/dialog/Dialog.vue'
import MetaView from '@renderer/components/meta_view/MetaView.vue'
//
import { ref, watchEffect } from 'vue'
import { useLoadData } from '@renderer/hook/load_data'
import { useRouter } from 'vue-router'
import { assertIsDefined } from '@renderer/utils/assert'
import { useWheelDownHandler } from '@renderer/hook/wheel_down_handler'
import { scanner } from '@renderer/utils/scanner'
import { Filter } from '@api/type/tag_system'
import cardStyle from '@renderer/components/style/card.module.css'
import buttonStyle from '@renderer/components/style/button.module.css'
import type { Meta, ThinMeta } from '@api/metas/meta'
import { useMetaView } from '@renderer/components/meta_view/hook'
import state from '@renderer/store/metaSrc'
import { list } from '@renderer/api'
//
const props = defineProps<{
  srcId: string
  search: string
}>()
//
const router = useRouter()
const { data: items, loadData } = useLoadData<Meta | ThinMeta>()
const metaSrc = state.metaSrc.value.find((el) => el.id === props.srcId)
assertIsDefined(metaSrc)
//
const extraFlag = ref(false)
let page = 1
let filter: Filter
const search = (input: string) => {
  const f = scanner(input)
  if (f instanceof Error) {
    //handle filter error==============
    return
  } else {
    filter = f
  }
  page = 1
  loadData(20, async () => {
    const res = await list(props.srcId, filter, { perPage: 20, page })
      .then((res) => {
        extraFlag.value = res.pageInfo.hasNextPage
        return res.items
      })
      .catch((err) => {
        //handle err
        return []
      })
    return res
  })
}
//
function handleSearch(search: string) {
  router.replace({
    name: 'manager_search_meta',
    params: {
      metaSrcId: props.srcId
    },
    query: {
      search
    }
  })
}
//
watchEffect(() => search(props.search))
const wheel = useWheelDownHandler(() => {
  if (!extraFlag.value) return

  page++
  loadData(
    20,
    async () => {
      const res = await list(props.srcId, filter, { perPage: 20, page })
        .then((res) => {
          extraFlag.value = res.pageInfo.hasNextPage
          return res.items
        })
        .catch((err) => {
          //handle err
          return []
        })
      return res
    },
    false
  )
})
//
const { loading, flagDialogShow, metaData, namespaceLang, processParamView, showMetaView } =
  useMetaView()
function handleTo(meta: Meta | ThinMeta) {
  if ('tags' in meta) showMetaView(meta)
  else processParamView(props.srcId, meta.id)
}
//
const scrollTop = ref(0)
function emitToTopbar(e: Event) {
  scrollTop.value = (e.target as HTMLElement).scrollTop
}
</script>

<template>
  <Overlay :class="$style.search_meta_view">
    <div :class="$style.content" @scroll="emitToTopbar" @wheel="wheel">
      <!--  -->
      <Topbar :class="$style.topbar" :height="60" :scrollTop="scrollTop">
        <div :class="$style.src">{{ metaSrc.name }}</div>
        <InputSearch :input="props.search" @search="handleSearch" />
        <button :class="[$style.button, buttonStyle.button]">
          <Options />
        </button>
      </Topbar>
      <!--  -->
      <div :class="$style.tools">
        <button type="button" :class="[$style.button, buttonStyle.button]">
          <InformationOutline />
        </button>
        <button type="button" :class="[$style.button, buttonStyle.button]">
          <Rocket16Filled />
        </button>
      </div>
      <!--  -->
      <div :class="[$style.meta_link, cardStyle.container]">
        <LinkMeta v-for="item in items" :meta="item.item" @to="handleTo(item.item!)" />
      </div>
      <!--  -->
      <ExtraMessage v-if="!extraFlag" />
    </div>
    <template #overlay>
      <Dialog v-model="flagDialogShow">
        <MetaView
          :meta="metaData!"
          :namespaceLang="namespaceLang!"
          @close="flagDialogShow = false"
        />
      </Dialog>
    </template>
  </Overlay>
</template>

<style module>
.search_meta_view {
  height: 100%;
}
.content {
  height: 100%;
  overflow: auto;
  background-color: #fffffe;
}
/*  */
.topbar {
  position: sticky;
  float: left;
  width: 100%;
  padding: 0 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: #fff;
}
.src {
  font-size: 20px;
  font-weight: 700;
}
/*  */
.meta_link {
  margin-top: 60px;
  flex: 1;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--width));
  justify-items: center;
  gap: 25px;
  padding-left: 15px;
}
/*  */
.tools {
  position: sticky;
  float: right;
  right: 10px;
  top: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1;
}
/*  */
.button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 5px;
  padding: 6px;
  background-color: #eff0f3;
}
</style>
