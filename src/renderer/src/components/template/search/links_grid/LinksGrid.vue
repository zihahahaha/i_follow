<script setup lang="ts">
import { inject } from 'vue'
import { topbarHeight } from '../key'

const marginTop = `${inject(topbarHeight)}px`

type Props = {
  extraFlag: boolean
}
const props = withDefaults(defineProps<Props>(), {
  extraFlag: false
})
</script>

<template>
  <div :class="$style.links">
    <slot />
  </div>
</template>

<style module>
.links {
  position: relative;
  margin-top: v-bind(marginTop);
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--width));
  justify-content: center;
  justify-items: center;
  gap: 15px;
}
</style>
