<script setup lang="ts">
import Skeleton from '@renderer/components/common/skeleton/Skeleton.vue'
import SkeletonLink from './SkeletonLink.vue'
//
import { TagMultiple20Filled } from '@vicons/fluent'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import linkStyle from './link.module.css'
import cardStyle from '@renderer/components/style/card.module.css'
import type { Meta, ThinMeta } from '@api/type/meta'
//
const props = defineProps<{
  meta: Meta | ThinMeta | undefined
}>()
const emit = defineEmits<{
  to: []
}>()
//
function handleClick() {
  if (props.meta) emit('to')
}
// const tagged = computed(() => {
//   return collectMedia.some(props.media!.id, props.src)
// })

// function to() {
//   router.push({ path: '/meta', query: { id: props.media?.id, src: props.src } })
// }
// async function tag() {
//   if (tagged.value) {
//     collectMedia.remove(props.media!.id, props.src)
//   } else {
//     collectMedia.insert(props.media!.id, props.src)
//   }
// }
</script>

<template>
  <div :class="cardStyle.container" @click="handleClick">
    <Skeleton :loading="props.meta === undefined">
      <div :class="linkStyle.link" @click="">
        <div :class="linkStyle.cover_container">
          <img :src="props.meta?.cover" alt="" :class="linkStyle.cover" />
          <!-- <button
            type="button"
            :class="[linkStyle.button, linkStyle.pos, { [$style.tagged]: tagged }]"
            @click.stop="tag"
          >
            <TagMultiple20Filled />
          </button> -->
        </div>

        <p :class="linkStyle.title">{{ props.meta?.title }}</p>
      </div>

      <template #skeleton>
        <SkeletonLink />
      </template>
    </Skeleton>
  </div>
</template>

<style module>
.tagged {
  visibility: visible;
  color: orange !important;
}
</style>
