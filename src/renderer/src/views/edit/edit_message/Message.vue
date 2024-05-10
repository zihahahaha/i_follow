<script setup lang="ts">
const props = defineProps<{
  message: string
  close: Function
}>()
</script>

<template>
  <div :class="$style.end_message">
    {{ props.message }}
  </div>
</template>

<style module>
.end_message {
  background-color: white;
  text-align: center;
  min-width: 100px;
  padding: 0 15px;
  height: 30px;
  color: #000;
}
</style>
