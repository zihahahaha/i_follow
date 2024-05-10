<script setup lang="ts">
import { MeidaTemplate, MediaHeader, MediaTopBar, Tags } from '@renderer/components/media'
import mediaStyle from '@renderer/components/media/media.module.css'
import { ref, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Cart } from '@vicons/ionicons5'
import type { GetMedia } from '@/type'
import { useTags } from '@renderer/components/hook/tags'
import { assertIsNumber, assertIsDefined } from '@renderer/utils'
import { lastRoute } from '@renderer/router'

const router = useRouter()

const route = useRoute()
const queryId = Number(route.query.id)
assertIsNumber(queryId)
const api = window.api

const data = ref<GetMedia>()
;(async () => {
  data.value = await api.get(queryId)
  assertIsDefined(data.value)
  console.log(data.value)
})()

const tags = useTags(data as Ref<GetMedia>)

function handleBack() {
  if (lastRoute.name === 'collection') {
    router.back()
  } else {
    router.push({
      name: 'collection',
      query: {
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
    <template #tools>
      <!-- <ul :class="mediaStyle.tools">
        <li>
          <button
            :class="mediaStyle.tool_button"
            @click="
              router.push({
                path: '/collect',
                query: {
                  type: 'anilist',
                  id: data?.id
                }
              })
            "
          >
            <Cart />
          </button>
        </li>
      </ul> -->
    </template>
  </MeidaTemplate>
</template>
