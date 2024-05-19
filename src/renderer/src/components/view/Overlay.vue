<template>
  <div :class="$style.view">
    <slot />
    <div :class="$style.overlay">
      <slot name="overlay" />
    </div>
  </div>
</template>

<style module>
.view {
  position: relative;
}
.overlay {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  pointer-events: none;
}
</style>
