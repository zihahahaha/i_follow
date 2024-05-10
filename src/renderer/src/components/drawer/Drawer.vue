<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { CloseCircleOutline } from '@vicons/ionicons5'

onUnmounted(() => {
  document.body.style.overflow = ''
})

const show = defineModel<boolean>()

watch(show, () => {
  if (show.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <div :class="$style.drawer" v-if="show">
      <div :class="$style.back">
        <div :class="$style.header">
          <slot name="header" />
          <button type="button" :class="$style.close_button" @click="show = false">
            <CloseCircleOutline />
          </button>
        </div>

        <div :class="$style.content">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style module>
.drawer {
  z-index: 999;
  position: fixed;
  width: calc(100% - var(--aside));
  height: 100vh;
  left: var(--aside);
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}
.back {
  position: absolute;
  left: 0;
  right: 0;
  top: 100px;
  bottom: 0;
  background-color: #333333;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  overflow: hidden;
}
/* ================ */
.header {
  box-sizing: content-box;
  position: relative;
  height: 60px;
}
.close_button {
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border-radius: 20px;
  color: #ccc;
}
.close_button:hover {
  background-color: #666;
}
/* ================== */
.content {
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}
</style>
