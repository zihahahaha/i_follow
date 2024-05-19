<script setup lang="ts">
import SearchMetaView from './SearchMetaView.vue'
//
import { ref } from 'vue'
import stateMetaViews from '@renderer/store/search_meta_views'
import stateMetaSrc from '@renderer/store/metaSrc'
import { assertIsString, assertIsDefined, assertIsOptionString } from '@renderer/utils/assert'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
//
const route = useRoute()
//
const srcId = ref('')
let search = ref('')
watch(
  route,
  () => {
    if (route.name !== 'manager_search_meta') return
    const s = route.params.metaSrcId
    assertIsString(s)
    srcId.value = s
    const se = route.query.search
    assertIsOptionString(se)
    search.value = se ? se : ''
    const metaSrc = stateMetaSrc.metaSrc.value.find((el) => el.id == srcId.value)
    assertIsDefined(metaSrc)
    stateMetaViews.insert({
      name: metaSrc.name,
      srcId: srcId.value,
      search: search.value
    })
  },
  {
    immediate: true
  }
)
</script>

<template>
  <KeepAlive v-for="view in stateMetaViews.views.value">
    <SearchMetaView v-if="srcId === view.srcId" :srcId="view.srcId" :search="search" />
  </KeepAlive>
</template>
