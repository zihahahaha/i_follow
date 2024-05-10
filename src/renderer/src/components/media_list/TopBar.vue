<script setup lang="ts">
import CommonTopBar from '@renderer/components/common/top_bar'
</script>

<template>
  <CommonTopBar :height="60" :class="$style.top_bar">
    <slot />
  </CommonTopBar>
</template>

<style module>
.top_bar {
  width: 100%;
  position: sticky;
  float: left;
  background-color: white;
  align-items: center;
  padding: 10px 0;
}
</style>
