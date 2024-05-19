<script setup lang="ts">
import SearchMetaView from './SearchMetaView.vue'
//
import { ref } from 'vue'
import state from '@renderer/store/search_meta_views'
import { useMetaSrc } from '@renderer/api'
import { assertIsString, assertIsDefined, assertIsOptionString } from '@renderer/utils/assert'
import { onActivated, watch } from 'vue'
import { LocationQueryValue, useRoute } from 'vue-router'
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
    const api = useMetaSrc(srcId.value)
    assertIsDefined(api)
    state.insert({
      name: api.name,
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
  <KeepAlive v-for="view in state.views.value">
    <SearchMetaView v-if="srcId === view.srcId" :srcId="view.srcId" :search="search" />
  </KeepAlive>
</template>
