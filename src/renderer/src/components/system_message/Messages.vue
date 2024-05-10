<script setup lang="tsx">
import type { Component } from 'vue'
import Components from '@renderer/components/common/components'
import { messages } from './message'
</script>

<template>
  <Components
    is="TransitionGroup"
    :enter-from-class="$style['message-leave-to']"
    :leave-to-class="$style['message-leave-to']"
    :enter-active-class="$style['message-active']"
    :leave-active-class="$style['message-leave-active']"
    :move-class="$style['message-active']"
    tag="div"
    :class="$style.messages"
    :components="messages"
  />
</template>

<style module>
.messages {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
  align-items: flex-end;
}
.message-active {
  transition: all 0.5s ease;
}
.message-leave-active {
  transition: all 0.5s ease;
  position: absolute;
}
.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
