<!-- 可以伸缩的topbar -->
<script setup lang="ts">
import { ref, provide, computed, watch } from 'vue'
import { Flag } from './key'

const props = defineProps<{
  height: number
  scrollTop: number
}>()

const flag = ref(true)
provide(Flag, flag)
const top = computed(() => {
  if (flag.value === true) return '0px'
  else return `-${props.height}px`
})

let lastTop: number
watch(
  () => props.scrollTop,
  () => {
    if (props.scrollTop > props.height / 2 && props.scrollTop - lastTop > 0) flag.value = false
    else flag.value = true
    lastTop = props.scrollTop
  }
)
</script>

<template>
  <div :class="$style.topbar" :style="{ height: `${props.height}px` }">
    <slot />
  </div>
</template>

<style module>
.topbar {
  transition: top 0.4s ease;
  top: v-bind(top);
  z-index: 1;
}
</style>
