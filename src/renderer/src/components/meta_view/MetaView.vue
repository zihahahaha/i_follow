<script setup lang="ts">
import Tags from '@renderer/components/tags/Tags.vue'
import { CloseCircleOutline } from '@vicons/ionicons5'
//
import type { Meta } from '@api/metas/meta'
import { NamespaceLang } from '@api/type/tag_system'
import buttonStyle from '@renderer/components/style/button.module.css'
//
const props = defineProps<{
  namespaceLang: NamespaceLang
  meta: Meta
}>()
const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <div :class="$style.meta" @mousedown.stop>
    <button type="button" :class="$style.close_button" @click="emit('close')">
      <CloseCircleOutline />
    </button>
    <div :class="$style.header">
      <img v-if="meta.banner" :src="meta.banner" alt="" :class="$style.banner" />
      <img :src="meta.cover" alt="" :class="$style.cover" />
      <div :class="$style.title">
        {{ meta.title }}
      </div>
      <button type="button" :class="$style.collect_button">采集</button>
    </div>
    <div :class="$style.body">
      <Tags :tags="meta.tags" :namespaceLang="namespaceLang" />
      <div>{{ meta.description }}</div>
    </div>
  </div>
</template>

<style module>
.meta {
  position: absolute;
  top: 10vh;
  width: 100%;
  max-width: 1000px;
  left: 50%;
  translate: -50% 0;
  pointer-events: auto;
}
.close_button {
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 1;
  width: 50px;
  height: 50px;
  border: none;
  background-color: transparent;
  color: #eff0f3;
}
.close_button:hover {
  color: #ff8e3c;
}
.header {
  position: relative;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.3);
  height: 200px;
}
.collect_button {
  position: absolute;
  right: 15px;
  bottom: 5px;
  font-size: 16px;
  padding: 5px 15px;
  border-radius: 5px;
  border-style: solid;
  border-color: #ff8e3c;
  transition: all 0.2s;
  background-color: rgba(0, 0, 0, 0.2);
  color: #eff0f3;
}
.collect_button:hover {
  background-color: #ff8e3c;
}
.banner {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6);
}
.cover {
  position: absolute;
  width: 120px;
  height: 170px;
  left: 50px;
  bottom: -30px;
  object-fit: cover;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.3);
}
.title {
  position: absolute;
  left: 180px;
  bottom: 10px;
  font-size: 20px;
  color: #fefefe;
}
.body {
  display: flex;
  padding: 10px;
  padding-top: 50px;
  background-color: #fff;
}
</style>
