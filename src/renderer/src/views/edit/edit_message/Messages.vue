<script setup lang="tsx">
import type { Component } from 'vue'
import Components from '@renderer/components/common/components'

const props = defineProps<{
  messages: Array<{
    component: Component
    props: any
  }>
}>()
</script>

<template>
  <Components
    is="TransitionGroup"
    :enter-from-class="$style['leave-to']"
    :leave-to-class="$style['leave-to']"
    :enter-active-class="$style['active']"
    :leave-active-class="$style['leave-active']"
    :move-class="$style['move']"
    tag="div"
    :class="$style.messages"
    :components="props.messages"
  />
</template>

<style module>
.messages {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
}
.active {
  transition: all 0.5s ease;
}
.leave-active {
  transition: all 0.5s ease;
  position: absolute;
}
.move {
  transition: all 0.5s ease;
}
.enter-from,
.leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
