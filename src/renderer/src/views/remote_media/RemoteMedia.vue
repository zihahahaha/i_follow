<script setup lang="ts">
import { MeidaTemplate, MediaHeader, MediaTopBar, Tags } from '@renderer/components/media'
import { ref, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { GetMedia } from '@/type'
import { useTags } from '@renderer/components/hook/tags'
import { useApi, assertSourcetype } from '@renderer/api'
import { assertIsNumber, assertIsDefined } from '@renderer/utils'
import { mediaBuffer } from '@renderer/store'
import { lastRoute } from '@renderer/router'

const router = useRouter()

const route = useRoute()
const queryId = Number(route.query.id)
const queryType = route.query.type
assertIsNumber(queryId)
assertSourcetype(queryType)
const api = useApi(queryType)

const data = ref<GetMedia>()
;(async () => {
  if (lastRoute.name === 'discover') data.value = mediaBuffer.find(queryId, queryType)
  if (!data.value) data.value = await api.get(queryId)
  assertIsDefined(data.value)
  console.log(data.value)
  mediaBuffer.insert(data.value, queryType)
})()

const tags = useTags(data as Ref<GetMedia>)

function handleBack() {
  if (lastRoute.name === 'discover') {
    router.back()
  } else {
    router.push({
      name: 'discover',
      query: {
        type: queryType,
        id: queryId
      }
    })
  }
}
</script>

<template>
  <MeidaTemplate>
    <MediaTopBar :title="data?.title" @back="handleBack" />
    <MediaHeader :media="data" :tags="tags" />
    <template #aside>
      <Tags :media="data" :tags="tags" />
    </template>
    <template #data>
      <div>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>a</p>
      </div>
    </template>
  </MeidaTemplate>
</template>
