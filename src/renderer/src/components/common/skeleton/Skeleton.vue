<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <slot v-if="!props.loading" />
  <slot name="skeleton" v-else />
</template>
