<script setup lang="ts">
import { CloseSharp } from '@vicons/ionicons5'
const props = defineProps<{
  warningLevel: number
  message: string
  close: Function
}>()

console.log(props)

function close() {
  props.close()
}
</script>

<template>
  <div :class="$style.message">
    {{ warningLevel }}
    {{ message }}
    <button type="button" :class="$style.close_button" @click="close">
      <CloseSharp />
    </button>
  </div>
</template>

<style module>
.message {
  pointer-events: auto;
  display: flex;
  align-items: center;
  background-color: white;
  text-align: center;
  min-width: 100px;
  padding: 0 15px;
  color: #000;
  border: solid 1px #000;
}
.close_button {
  border: none;
  padding: 0;
  background-color: transaprent;
  width: 30px;
}
.close_button:hover {
  background-color: #aaa;
}
</style>
