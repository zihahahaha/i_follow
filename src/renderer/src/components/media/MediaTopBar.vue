<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { CaretBackCircleOutline } from '@vicons/ionicons5'

const porps = defineProps<{
  title: string | undefined
}>()
const emit = defineEmits<{
  back: []
}>()

const height = ref('70px')
const fontSize = ref('35px')
const handleTopBar = () => {
  if (document.documentElement.scrollTop >= 0 && document.documentElement.scrollTop <= 30) {
    height.value = `${70 - document.documentElement.scrollTop}px`
    fontSize.value = `${35 - ((35 - 20) / (30 - 0)) * document.documentElement.scrollTop}px`
  } else if (document.documentElement.scrollTop > 30) {
    height.value = '40px'
    fontSize.value = '20px'
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleTopBar)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleTopBar)
})
</script>

<template>
  <div :class="$style.top_bar">
    <button type="button" :class="$style.back_button" @click="emit('back')">
      <CaretBackCircleOutline />
    </button>
    <div :class="$style.title">{{ porps.title }}</div>
  </div>
</template>

<style module>
.top_bar {
  display: flex;
  align-items: center;
  height: v-bind(height);
  font-size: v-bind(fontSize);
  text-align: center;
  clip-path: inset(0 0 -100px 0);
  z-index: 3;
  position: sticky;
  top: 0px;
  float: left;
  width: 100%;
  background-color: white;
}
.back_button {
  flex-shrink: 0;
  height: 100%;
  width: auto;
  border: none;
  background-color: transparent;
  width: v-bind(height);
  cursor: pointer;
}
.title {
  flex: 1;
  text-wrap: nowrap;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
