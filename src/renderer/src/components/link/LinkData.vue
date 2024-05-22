<script setup lang="ts">
import Skeleton from '@renderer/components/common/skeleton/Skeleton.vue'
import SkeletonLink from './SkeletonLink.vue'
//
import linkStyle from './link.module.css'
import cardStyle from '@renderer/components/style/card.module.css'
import type { DataLink } from '@api/data/data'
//
const props = defineProps<{
  data: DataLink | undefined
}>()
const emit = defineEmits<{
  to: []
}>()
//
function handleClick() {
  if (props.data) emit('to')
}
</script>

<template>
  <div :class="cardStyle.container" @click="handleClick">
    <Skeleton :loading="props.data === undefined">
      <div :class="linkStyle.link" @click="">
        <div :class="linkStyle.cover_container">
          <img :src="props.data?.cover" alt="" :class="linkStyle.cover" />
          <!-- <button
            type="button"
            :class="[linkStyle.button, linkStyle.pos, { [$style.tagged]: tagged }]"
            @click.stop="tag"
          >
            <TagMultiple20Filled />
          </button> -->
        </div>

        <p :class="linkStyle.title">{{ props.data?.title }}</p>
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
