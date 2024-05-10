<script setup lang="ts"></script>

<template>
  <div :class="$style.media">
    <slot />
    <div :class="$style.content">
      <div :class="$style.area">
        <slot name="aside" />
        <div :class="$style.data">
          <slot name="data" />
        </div>
      </div>
    </div>
    <slot name="tools" />
  </div>
</template>

<style module>
.media {
  position: relative;
  z-index: 0;
  width: 100%;
  padding-top: 0.05px;
}
/*============================================*/
.content {
  z-index: 2;
  background-color: #e5ebf1;
  position: relative;
}
.area {
  max-width: 1300px;
  margin: auto;
  display: flex;
}
.data {
  flex: 1;
}
</style>
