<script setup lang="ts">
import { default as SearchTemplate, useSearch } from '@renderer/components/search'
import Li from '@renderer/components/Li.vue'

const emit = defineEmits<{
  search: []
  updateSearch: [string]
}>()
const { $style, search, handleClick } = useSearch(emit)
</script>

<template>
  <SearchTemplate v-slot="{ flag, updateFlag }" v-model="search" @search="emit('search')">
    <ul
      :class="[$style.menu, $style.popup, $style['--m_left'], $style['--bottom']]"
      v-if="flag"
      @mousedown.stop
    >
      <Li @click="updateFlag(false), handleClick('title')">标题</Li>
      <Li @click="updateFlag(false), handleClick('staff')">职员</Li>
    </ul>
  </SearchTemplate>
</template>
