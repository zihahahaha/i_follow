<!-- 可以伸缩的topbar -->
<script setup lang="ts">
import { ref, provide, computed, watch } from 'vue'
import { Flag } from './key'
import { useCompatibleLifecycle } from '../compatible_lifecycle'

const props = withDefaults(
  defineProps<{
    height: number
    element?: HTMLElement | Window
  }>(),
  {
    element: () => window
  }
)

const flag = ref(true)
const top = computed(() => {
  if (flag.value === true) return '0px'
  else return `-${props.height}px`
})
provide(Flag, flag)
let lastTop: number
const scroll = () => {
  if (props.element === window) {
    if (
      document.documentElement.scrollTop > props.height / 2 &&
      document.documentElement.scrollTop - lastTop > 0
    ) {
      flag.value = false
    } else {
      flag.value = true
    }
    lastTop = document.documentElement.scrollTop
  } else {
    let element = props.element as HTMLElement
    if (element.scrollTop > props.height / 2 && element.scrollTop - lastTop > 0) {
      flag.value = false
    } else {
      flag.value = true
    }
    lastTop = element.scrollTop
  }
}

watch(
  () => props.element,
  (newValue, oldValue) => {
    newValue.addEventListener('scroll', scroll)
    oldValue?.removeEventListener('scroll', scroll)
  }
)

const { onMounted, onActivated, onDeactivated, onUnmounted } = useCompatibleLifecycle()

onMounted(() => {
  props.element.addEventListener('scroll', scroll)
})

onActivated(() => {
  props.element.addEventListener('scroll', scroll)
})

onDeactivated(() => {
  props.element.removeEventListener('scroll', scroll)
})

onUnmounted(() => {
  props.element.removeEventListener('scroll', scroll)
})
</script>

<template>
  <div :class="$style.top_bar" :style="{ height: `${props.height}px` }">
    <slot />
  </div>
</template>

<style module>
.top_bar {
  transition: top 0.4s ease;
  top: v-bind(top);
  z-index: 1;
}
</style>
