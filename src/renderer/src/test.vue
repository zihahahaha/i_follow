<script setup lang="ts">
import { ref } from 'vue'

const num = ref(0)
</script>

<template>
  <div>{{ num }}</div>
  <button @click="num++">CLICK</button>
</template>
