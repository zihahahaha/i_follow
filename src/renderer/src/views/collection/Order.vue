<script setup lang="ts">
import { useCssModule } from 'vue'
import { usePopuped, popupStyle } from '@renderer/components/common/popuped'
import Li from '../../components/Li.vue'
import { FilterOutline } from '@vicons/ionicons5'

const { flag, updateFlag, popupedStyle } = usePopuped()
import menu_style from '../../assets/menu.module.css'
const $style = { ...useCssModule(), ...popupedStyle, ...popupStyle, ...menu_style }

const emit = defineEmits<{
  order: [order: 'asc' | 'desc']
}>()
</script>

<template>
  <div :class="[$style.set_popuped, $style.order]">
    <button :class="$style.order_button" @click="updateFlag(!flag)">
      <FilterOutline />
    </button>
    <ul :class="[$style.menu, $style.popup, $style['--m_left'], $style['--bottom']]" v-if="flag">
      <Li @click="updateFlag(false), emit('order', 'asc')">按创建时间升序</Li>
      <Li @click="updateFlag(false), emit('order', 'desc')">按创建时间降序</Li>
    </ul>
  </div>
</template>

<style module>
.order {
  height: 40px;
  width: 50px;
  box-shadow: 0 0 15px #aaaa;
  margin-left: 8px;
  background-color: white;
}
.order_button {
  height: 40px;
  width: 50px;
  border: none;
  background-color: transparent;
}
.order_button:hover {
  background-color: #ccc;
}
</style>
