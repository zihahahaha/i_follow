<script setup lang="ts">
import Topbar from '@renderer/components/common/topbar'
import InputSearch from '@renderer/components/filters/InputSearch.vue'
import LinkSearchData from './LinkSearchData.vue'
import Overlay from '@renderer/components/view/Overlay.vue'
import Dialog from '@renderer/components/dialog/Dialog.vue'
import MetaView from '@renderer/components/meta_view/MetaView.vue'
//
import { ref } from 'vue'
import state from '@renderer/store/data_src'
import { scanner } from '@renderer/utils/scanner'
import { useRouter } from 'vue-router'
import { useMetaView } from '@renderer/components/meta_view/hook'
//
let savedInput: string
const router = useRouter()
//
const linkSearchDatas = ref<InstanceType<typeof LinkSearchData>[]>([])
function search(input: string) {
  const filter = scanner(input)
  if (filter instanceof Error) {
    //handle filter error==============
    return
  }
  savedInput = input
  linkSearchDatas.value.forEach((el) => {
    el.search(filter)
  })
}
//
function toSearch(srcId: string) {
  router.push({
    name: 'manager_search_meta',
    params: {
      metaSrcId: srcId
    },
    query: {
      search: savedInput
    }
  })
}
//
const { loading, flagDialogShow, metaData, namespaceLang, processParamView, showMetaView } =
  useMetaView()
//
const scrollTop = ref(0)
function emitToTopbar(e: Event) {
  scrollTop.value = (e.target as HTMLElement).scrollTop
}
</script>

<template>
  <Overlay :class="$style.search_meta">
    <div :class="$style.content" @scroll="emitToTopbar">
      <!--  -->
      <Topbar :class="$style.topbar" :height="80" :scrollTop="scrollTop">
        <div>
          <div :class="$style.option">搜索</div>
          <InputSearch @search="search" />
        </div>
        <div>
          <div :class="$style.option">数据源</div>
          <InputSearch @search="" />
        </div>
      </Topbar>
      <!--  -->
      <div :class="$style.data_src_link">
        <LinkSearchData
          v-for="dataSrc in state.dataSrc.value"
          ref="linkSearchDatas"
          :srcId="dataSrc.id"
          @toSearch="toSearch"
          @view="showMetaView"
          @paramView="processParamView"
        />
      </div>
    </div>
    <!--  -->
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
.search_meta {
  height: 100%;
}
.content {
  overflow: auto;
  height: 100%;
}
/*  */
.topbar {
  position: sticky;
  float: left;
  display: flex;
  width: 100%;
  background-color: white;
  align-items: center;
  gap: 15px;
  padding: 0 10px;
}
.option {
  padding: 5px 2px;
}
/*  */
.data_src_link {
  margin-top: calc(80px + 10px);
}
</style>
