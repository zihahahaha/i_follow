<script setup lang="ts">
import { provide, ref } from 'vue'
import { topbarHeight } from './key'

provide(topbarHeight, 60)
</script>

<template>
  <div :class="$style.search_template">
    <slot name="topbar" />

    <slot name="links" />

    <slot />
  </div>
</template>

<style module>
.search_template {
  position: relative;
  padding-top: 0.05px;
}
@media screen and (min-width: 1200px) {
 .search_template  {
    --width: 175px;
    --font_size: 16px;
  }
}
@media screen and (max-width: 1200px) {
 .search_template  {
    --width: 160px;
    --font_size: 16px;
  }
}
@media screen and (max-width: 760px) {
 .search_template  {
    --width: 100px;
    --font_size: 14px;
  }
}
@media screen and (max-width: 600px) {
 .search_template  {
    --width: 85px;
    --font_size: 12px;
  }
}
</style>
