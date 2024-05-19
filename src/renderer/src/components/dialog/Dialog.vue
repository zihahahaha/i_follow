<script setup lang="ts">
const visible = defineModel<boolean>({ required: true })
</script>

<template>
  <div :class="$style.dialog" v-if="visible" @mousedown="visible = false">
    <slot />
  </div>
</template>

<style module>
.dialog {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  z-index: 999;
  pointer-events: auto;
}
</style>
