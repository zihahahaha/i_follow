<script setup lang="ts">
const props = defineProps<{
  extraFlag: boolean
}>()
</script>

<template>
  <div :class="$style.media_list">
    <slot name="header" />

    <div :class="$style.medias">
      <slot name="medias" />
    </div>

    <div :class="$style.extra_message" v-if="!props.extraFlag">--已经到底了--</div>
  </div>
</template>

<style module>
.media_list {
  position: relative;
  width: 100%;
  background-color: #fff;
  padding-top: 0.05px;
}
.medias {
  position: relative;
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--width));
  justify-content: center;
  justify-items: center;
  gap: 15px;
  --font_size: 16px;
}
.extra_message {
  text-align: center;
  color: gray;
  font-size: 14px;
  padding-top: 10px;
}
/*  */
@media screen and (min-width: 1200px) {
  .medias {
    --width: 175px;
  }
}
@media screen and (max-width: 1200px) {
  .medias {
    --width: 160px;
  }
}
@media screen and (max-width: 760px) {
  .medias {
    --width: 100px;
    --font_size: 14px;
  }
}
@media screen and (max-width: 600px) {
  .medias {
    --width: 85px;
    --font_size: 12px;
  }
}
</style>
