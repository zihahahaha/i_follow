<script setup lang="ts">
import { useCssModule } from 'vue'
import menu_style from '../assets/menu.module.css'

const $style = { ...useCssModule(), ...menu_style }

</script>

<template>
  <li :class="[$style.menu_item, $style.li]">
    <slot />
  </li>
</template>

<style module>
.li {
  background-color: white;
}

.li:hover {
  background-color: #aaa;
}
</style>
