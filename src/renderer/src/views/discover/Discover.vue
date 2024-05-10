<script setup lang="ts">
import { useLoadData } from '@renderer/components/hook/load_data'
import { onActivated, onDeactivated, onMounted, ref } from 'vue'
import { useApi, SourceType } from '@renderer/api'
import { TopBar, MediaListTemplate } from '@renderer/components/media_list'
import Search from './Search.vue'
import SourceSelect from './SourceSelect.vue'
import MediaLink from './MediaLink.vue'
import { useWheelEvent, useMediaList } from '@renderer/components/media_list'
import { useScrollPosition } from '@renderer/components/common/scroll_position'

useScrollPosition();

const api = useApi(SourceType.anilist)
const sourceType = ref(SourceType.anilist)

const search = ref('')

function scroll() {
  window.scrollTo({ top: 0 })
}

const { loadInit, loadExtra, data, extraFlag } = useLoadData(30, 15, api.search, search)
const wheel = useWheelEvent(loadExtra)
useMediaList(loadInit, wheel)


onMounted(() => {
  console.log('mount');
  
})
</script>

<template>
  <MediaListTemplate :extraFlag="extraFlag">
    <template #header>
      <TopBar :class="$style.topbar">
        <Search @search="loadInit(), scroll()" @updateSearch="(v) => (search = v)" />
        <SourceSelect />
      </TopBar>
    </template>

    <template #medias>
      <MediaLink v-for="i in data" :media="i.media" :type="sourceType" />
    </template>
  </MediaListTemplate>
</template>

<style module>
.topbar {
  display: flex;
  justify-content: space-between;
}
</style>
