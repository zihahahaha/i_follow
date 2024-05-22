<script setup lang="ts">
import { ref } from 'vue'
//
import { SearchCircleOutline } from '@vicons/ionicons5'
//
const emit = defineEmits<{
  search: [string]
}>()
//
const input = ref('')
</script>

<template>
  <component is="search" :class="$style.search">
    <button :class="$style.search_button">
      <SearchCircleOutline />
    </button>
    <input type="text" :class="$style.input" v-model="input" @keydown.enter="emit('search', input)" />
  </component>
</template>

<style module>
.search {
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 3px 5px;
  background-color: #eff0f3;
}
.search_button {
  width: 30px;
  height: 30px;
  padding: 0px;
  border: none;
  background-color: transparent;
  color: #aaa;
}

.input {
  border: none;
  outline: none;
  background-color: transparent;
}
</style>
