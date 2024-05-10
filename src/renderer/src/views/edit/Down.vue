<script setup lang="ts">
import { CloseCircleOutline } from '@vicons/ionicons5'
import { onMounted, onUnmounted } from 'vue'

const show = defineModel<boolean>()

function resize() {
  if (window.innerWidth > 760) {
    show.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', resize)
})
onUnmounted(() => {
  window.addEventListener('resize', resize)
})
</script>

<template>
  <div :class="$style.down" v-if="show">
    <button type="button" :class="$style.close_button" @click="show = false">
      <CloseCircleOutline />
    </button>

    <div :class="$style.content">
      <slot />
    </div>
  </div>
</template>

<style module>
.down {
  --coverWidth: 250px;
  position: fixed;
  left: var(--aside);
  top: 0;
  width: calc(100% - var(--aside));
  height: 100vh;
}
.content {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  padding: 20px 0;
}
.close_button {
  padding: 5px;
  position: absolute;
  top: 10px;
  right: 15px;
  width: 50px;
  height: 50px;
  border: none;
  background-color: transparent;
  color: #fff;
  z-index: 1;
  border-radius: 15px;
}
.close_button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
