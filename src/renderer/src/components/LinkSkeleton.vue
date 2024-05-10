<script setup lang="ts"></script>

<template>
  <div :class="[$style.media, $style.skeleton]">
    <div :class="$style.skeleton_cover"></div>
    <div :class="$style.skeleton_title"></div>
  </div>
</template>

<style module>
@keyframes loading {
  0% {
    filter: brightness(80%);
  }
  100% {
    filter: brightness(100%);
  }
}
.skeleton {
  animation: loading 2s infinite alternate;
  width: var(--width);
}
.skeleton_cover {
  aspect-ratio: 2/3;
  background-color: gray;
  margin-bottom: 5px;
}
.skeleton_title {
  width: 60%;
  height: 20px;
  background-color: gray;
}
/* ========== */
</style>
