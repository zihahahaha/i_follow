<script setup lang="ts">
import { CloseCircleOutline } from '@vicons/ionicons5'
import { onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  url: string
  close: Function
}>()

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <div :class="$style.image_view">
    <CloseCircleOutline :class="$style.close_button" @click="props.close" />
    <img :src="props.url" alt="" :class="$style.image" />
  </div>
</template>

<style module>
.image_view {
  z-index: 999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333333;
}
.close_button {
  padding: 5px;
  position: absolute;
  right: 20px;
  top: 5px;
  width: 50px;
  height: 50px;
  border: none;
  background-color: transparent;
  color: #fff;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
}
.close_button:hover {
  background-color: gray;
}
.image :global {
  animation: zoomIn 0.5s;
}
</style>
