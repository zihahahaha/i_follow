<script setup lang="ts">
import { SearchCircleOutline } from '@vicons/ionicons5'
//
import { watchEffect, ref } from 'vue'
//
const props = defineProps<{
  input: string
}>()
const emit = defineEmits<{
  search: [string]
}>()
//
const input = ref('')
watchEffect(() => (input.value = props.input))
</script>

<template>
  <component is="search" :class="$style.search">
    <input
      type="text"
      placeholder="筛选"
      v-model="input"
      :class="$style.input"
      @keydown.enter="emit('search', input)"
    />
    <button :class="$style.search_button" @click="emit('search', input)">
      <SearchCircleOutline />
    </button>
  </component>
</template>

<style module>
.search {
  position: relative;
  display: flex;
  background-color: white;
  border-radius: 5px;
  background-color: #eff0f3;
  flex: 1;
  max-width: 800px;
  height: 40px;
}
/* =================== */
.input {
  border: none;
  background-color: transparent;
  font-size: 21px;
  outline: none;
  color: black;
  padding-left: 10px;
  flex: 1;
}
/* ====================== */
.search_button {
  border: none;
  outline: none;
  font-size: 16px;
  width: 40px;
  height: 40px;
  padding: 5px;
  background-color: transparent;
}
</style>
