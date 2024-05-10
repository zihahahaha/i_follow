<script setup lang="ts">
import { usePopuped } from '@renderer/components/common/popuped'
import { computed, ref, watch } from 'vue'
import { SearchCircleOutline } from '@vicons/ionicons5'
import { useLoadDataWithoutPreload } from '@renderer/components/hook/load_data'

const { flag, updateFlag, popupedStyle } = usePopuped()
const emit = defineEmits<{
  get: [number]
}>()

const searchValue = ref('')
const list = ref<HTMLElement>()

const { handleSearch, data } = useLoadDataWithoutPreload(
  10,
  10,
  window?.api?.search ? window.api.search : () => {},
  searchValue,
  list
)

watch(flag, () => {
  if (flag.value === false) activeIndex.value = undefined
})

let searchFlag = false
async function search() {
  searchFlag = true
  await handleSearch()
  searchFlag = false

  updateFlag(true)
}

function get(id: number) {
  emit('get', id)

  updateFlag(false)
}

const activeIndex = ref<number | undefined>()
function select(e: KeyboardEvent) {
  switch (e.key) {
    case 'ArrowUp':
      e.preventDefault()
      if (activeIndex.value === undefined) return
      activeIndex.value--
      break
    case 'ArrowDown':
      e.preventDefault()
      if (activeIndex.value === undefined) {
        activeIndex.value = 0
        return
      }
      activeIndex.value++
      break
  }
  if (activeIndex.value) {
    if (activeIndex.value < 0) activeIndex.value = data.value.length - 1
    if (activeIndex.value >= data.value.length) activeIndex.value = 0
  }
}

function handleKeyDown(e: KeyboardEvent) {
  if (searchFlag) return
  if (e.key === 'Enter') {
    if (activeIndex.value === undefined) search()
    else get(data.value[activeIndex.value].id)
  } else select(e)
}

const borderColor = computed(() => {
  console.log(flag.value)

  if (flag.value) return 'gray'
  else return '#1e1e1e'
})
</script>

<template>
  <component is="search" :class="[popupedStyle.set_popuped, $style.search]">
    <input
      type="text"
      :class="$style.search_input"
      placeholder="搜索"
      v-model="searchValue"
      @mousedown.stop
      @keydown="handleKeyDown"
      @focus="updateFlag(false)"
      @input="updateFlag(false)"
    />
    <button :class="$style.search_button" @mousedown.stop @click="search">
      <SearchCircleOutline />
    </button>
    <ul ref="list" :class="$style.dropdown" v-show="flag" @mousedown.stop>
      <li
        v-for="(e, index) in data"
        :class="[$style.dropdown_item, index === activeIndex ? $style.active : '']"
        @click="emit('get', e.id), updateFlag(false)"
      >
        <span>{{ e.title }}</span>
      </li>
    </ul>
  </component>
</template>

<style module>
.search {
  z-index: 3;
  top: 0;
  left: calc(var(--coverWidth) + 30px);
  width: calc(100% - var(--coverWidth) - 30px - 15px);
  position: absolute;
  display: flex;
  background-color: #1e1e1e;
  border-bottom: none;
  border-top: solid 2px transparent;
  border-left: solid 2px transparent;
  border-right: solid 2px transparent;
  border-color: v-bind(borderColor);
  transition-property: left, width;
  transition-duration: 0.2s;
}
.search_input {
  padding-left: 10px;
  flex: 1;
  min-width: 0;
  border: none;
  background-color: transparent;
  font-size: 21px;
  outline: none;
  color: #fff;
}
.search_button {
  flex-shrink: 0;
  border: none;
  outline: none;
  width: 50px;
  height: 50px;
  padding: 5px;
  color: #fff;
  background-color: transparent;
}
.dropdown {
  padding: 0;
  z-index: 1;
  position: absolute;
  left: -2px;
  top: 100%;
  width: calc(100% + 4px);
  min-height: 100px;
  max-height: 300px;
  background-color: #1e1e1e;
  overflow: auto;
  border-left: solid 2px #fff;
  border-right: solid 2px #fff;
  border-bottom: solid 2px #fff;
  border-color: gray;
  box-shadow: 1px 10px 10px rgba(0, 0, 0, 0.5);
}
.dropdown_item {
  height: 30px;
  padding-left: 10px;
}
.dropdown_item:hover {
  background-color: gray;
}
.active {
  background-color: gray;
}
</style>
