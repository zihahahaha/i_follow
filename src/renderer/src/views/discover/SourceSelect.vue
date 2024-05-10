<script setup lang="ts">
import { usePopuped, popupStyle } from '@renderer/components/common/popuped'
import menuStyle from '@renderer/assets/menu.module.css'
import { ref, defineModel } from 'vue'
import sourceSymbol from './source'
import anilistIcon from '@renderer/assets/favicon-anilist.png'
import bangumiIcon from '@renderer/assets/favicon-bangumi.png'

const { flag, updateFlag, popupedStyle } = usePopuped()

const sources = ref([
  {
    name: 'anilist',
    symbol: sourceSymbol['anilist'],
    icon: anilistIcon
  },
  {
    name: 'bangumi',
    symbol: sourceSymbol['bangumi'],
    icon: bangumiIcon
  }
])

const symbol = defineModel<Symbol>()
const activeIndex = ref(0)

function handleClick(s: (typeof sources)['value'][number], index: number) {
  symbol.value = s.symbol
  activeIndex.value = index
}
</script>

<template>
  <div :class="[$style.source, popupedStyle.set_popuped]">
    <span>来源：</span>
    <button type="button" :class="$style.source_button" @click="updateFlag(!flag)">
      <img :src="sources[activeIndex].icon" :class="$style.icon" /> {{ sources[activeIndex].name }}
    </button>
    <ul
      v-if="flag"
      :class="[menuStyle.menu, popupStyle.popup, popupStyle['--m_right'], popupStyle['--bottom']]"
    >
      <li
        v-for="(s, index) in sources"
        :class="[$style.source_item, menuStyle.menu_item]"
        @click="updateFlag(false), handleClick(s, index)"
      >
        <img :src="s.icon" :class="$style.icon" /> {{ s.name }}
      </li>
    </ul>
  </div>
</template>

<style module>
.source {
  display: flex;
  align-items: center;
}
.source_button {
  border: none;
  min-width: 60px;
  padding: 0 10px;
  height: 30px;
  background-color: white;
  box-shadow: 0 0 5px #aaaa;
  margin-right: 10px;
  border-radius: 15px;
  display: inline-flex;
  align-items: center;
}
.source_item {
  display: flex;
  align-items: center;
  height: 30px;
}
.source_item:hover {
  background-color: #aaa;
}
.icon {
  height: 20px;
  margin-right: 5px;
}
</style>
