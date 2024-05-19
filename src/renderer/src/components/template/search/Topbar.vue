<script setup lang="ts">
import CommonTopbar from '@renderer/components/common/topbar'
import { inject } from 'vue'
import { topbarHeight } from './key'

const props = defineProps<{
  element?: HTMLElement | Window
  scrollTop: number
}>()

const height = inject(topbarHeight)
</script>

<template>
  <CommonTopbar :height="height!" :scrollTop="props.scrollTop" :class="$style.topbar">
    <slot />
  </CommonTopbar>
</template>

<style module>
.topbar {
  width: 100%;
  position: sticky;
  float: left;
  background-color: white;
  align-items: center;
  padding: 10px 15px;
}
</style>
