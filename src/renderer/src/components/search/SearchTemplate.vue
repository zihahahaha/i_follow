<script setup lang="tsx">
import type { Ref } from 'vue'
import { useCssModule, watch, ref, inject } from 'vue'
import { Flag } from '@renderer/components/common/top_bar'
import { usePopuped } from '@renderer/components/common/popuped'
import { EllipsisVertical, SearchCircleOutline } from '@vicons/ionicons5'

const { flag, updateFlag, popupedStyle } = usePopuped()
import menuStyle from '@renderer/assets/menu.module.css'
const $style = { ...useCssModule(), ...popupedStyle, ...menuStyle }

const topbarFlag = inject(Flag)
watch(topbarFlag!, () => {
  if (topbarFlag?.value === false) {
    updateFlag(false)
  }
})

const searchValue = defineModel()
const input: Ref<HTMLInputElement | undefined> = ref()
watch(searchValue, () => {
  input.value?.focus()
})

const emit = defineEmits(['search'])
</script>

<template>
  <component is="search" :class="[$style.set_popuped, $style.search]">
    <button :class="$style.filter_button" @click="updateFlag(!flag)">
      <EllipsisVertical />
    </button>
    <slot :flag="flag" :updateFlag="updateFlag" />
    <input
      type="text"
      :class="$style.search_input"
      placeholder="筛选"
      v-model="searchValue"
      ref="input"
      @keydown.enter="emit('search')"
    />
    <button :class="$style.search_button" @click="emit('search')">
      <SearchCircleOutline />
    </button>
  </component>
</template>

<style module>
.search {
  position: relative;
  display: flex;
  background-color: white;
  box-shadow: 0 0 5px #aaaa;
  margin-left: 8px;
}
/* =================== */
.filter_button {
  border: none;
  outline: none;
  font-size: 16px;
  width: 40px;
  height: 40px;
  padding: 5px;
  background-color: transparent;
}
.filter_button:hover {
  backdrop-filter: brightness(0.8);
}
/* ====================== */
.search_input {
  border: none;
  background-color: transparent;
  font-size: 21px;
  outline: none;
  color: black;
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
