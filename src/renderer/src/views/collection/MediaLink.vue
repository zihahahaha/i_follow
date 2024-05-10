<script setup lang="ts">
import Skeleton from '@renderer/components/common/skeleton/Skeleton.vue'
import LinkSkeleton from '@renderer/components/LinkSkeleton.vue'
import type { SearchMedia } from '@/type'
import { useRouter } from 'vue-router'
import { mediaStyle } from '@renderer/components/media_list'
import { Edit32Filled, Delete20Filled, Add24Filled } from '@vicons/fluent'
import { editMedia } from '@renderer/store'
import { ref } from 'vue'
import { api } from '@renderer/api/local'

const router = useRouter()

const props = defineProps<{
  media: SearchMedia | undefined
}>()

const emit = defineEmits<{
  flush: []
}>()

function to() {
  router.push({ path: '/local_media', query: { id: props.media?.id } })
}

function edit() {
  if (props.media?.id) editMedia.set(props.media?.id)
  router.push({ path: '/edit' })
}

async function remove() {
  if (props.media?.id) await api.remove(props.media?.id)
  emit('flush')
}

const show = ref(false)
</script>

<template>
  <Skeleton :loading="props.media === undefined">
    <div :class="mediaStyle.link" @click="to">
      <div :class="mediaStyle.cover_contain">
        <img :src="props.media?.cover" alt="" :class="mediaStyle.media_cover" />
        <TransitionGroup
          tag="ul"
          :class="[$style.list, mediaStyle.pos]"
          :enter-active-class="$style.active"
          :leave-active-class="$style.active"
          :enter-from-class="$style.enter_from"
          :leave-to-class="$style.leave_to"
          @mouseleave="show = false"
        >
          <li key="add">
            <button type="button" :class="mediaStyle.button" @click.stop @mouseenter="show = true">
              <Add24Filled />
            </button>
          </li>
          <li v-if="show" key="edit">
            <button type="button" :class="mediaStyle.button" @click.stop="edit">
              <Edit32Filled />
            </button>
          </li>
          <li v-if="show" key="delete">
            <button type="button" :class="mediaStyle.button" @click.stop="remove">
              <Delete20Filled />
            </button>
          </li>
        </TransitionGroup>
      </div>

      <p>{{ props.media?.title }}</p>
    </div>
    <template #skeleton>
      <LinkSkeleton />
    </template>
  </Skeleton>
</template>

<style module>
.list {
  padding: 0;
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
}

.enter_from,
.leave_to {
  scale: 0;
}

.active {
  transition: all 0.2s;
}
</style>
