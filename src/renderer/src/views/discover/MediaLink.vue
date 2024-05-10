<script setup lang="ts">
import Skeleton from '@renderer/components/common/skeleton/Skeleton.vue'
import LinkSkeleton from '@renderer/components/LinkSkeleton.vue'
import type { SearchMedia } from '@/type'
import { TagMultiple20Filled } from '@vicons/fluent'
import { collectMedia } from '@renderer/store'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { mediaStyle } from '@renderer/components/media_list'

const props = defineProps<{
  media: SearchMedia | undefined
  type: string
}>()
const router = useRouter()

const tagged = computed(() => {
  return collectMedia.some(props.media!.id, props.type)
})

function to() {
  router.push({ path: '/remote_media', query: { id: props.media?.id, type: props.type } })
}
async function tag() {
  if (tagged.value) {
    collectMedia.remove(props.media!.id, props.type)
  } else {
    collectMedia.insert(props.media!.id, props.type)
  }
}
</script>

<template>
  <Skeleton :loading="props.media === undefined">
    <div :class="mediaStyle.link" @click="to">
      <div :class="mediaStyle.cover_contain">
        <img :src="props.media?.cover" alt="" :class="mediaStyle.media_cover" />
        <button
          type="button"
          :class="[mediaStyle.button, mediaStyle.pos, { [$style.tagged]: tagged }]"
          @click.stop="tag"
        >
          <TagMultiple20Filled />
        </button>
      </div>

      <p>{{ props.media?.title }}</p>
    </div>

    <template #skeleton>
      <LinkSkeleton />
    </template>
  </Skeleton>
</template>

<style module>
.tagged {
  visibility: visible;
  color: orange !important;
}
</style>
