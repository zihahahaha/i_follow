<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLoadData } from '@renderer/components/hook/load_data'
import { TopBar, MediaListTemplate } from '@renderer/components/media_list'
import MediaLink from './MediaLink.vue'
import Search from './Search.vue'
import Order from './Order.vue'
import { useWheelEvent, useMediaList } from '@renderer/components/media_list'
import { useScrollPosition } from '@renderer/components/common/scroll_position'

useScrollPosition();

const router = useRouter()
const search = ref('')

function scroll() {
  window.scrollTo({ top: 0 })
}

const { loadInit, loadExtra, data, extraFlag } = useLoadData(30, 15, window.api.search, search)
const wheel = useWheelEvent(loadExtra)
useMediaList(loadInit, wheel)
</script>

<template>
  <MediaListTemplate :extraFlag="extraFlag">
    <template #header>
      <TopBar :class="$style.topbar">
        <Order />
        <Search @search="loadInit(), scroll()" @updateSearch="(v) => (search = v)" />
        <SourceSelect />
      </TopBar>
    </template>

    <template #medias>
      <MediaLink v-for="i in data" :media="i.media" @flush="loadInit"/>
    </template>
  </MediaListTemplate>
</template>

<style module>
.topbar {
  display: flex;
}
</style>
