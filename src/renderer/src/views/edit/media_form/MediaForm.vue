<script setup lang="ts">
import { ref } from 'vue'
import ImagePreview from './ImagePreview.vue'
import TagInput from './TagInput.vue'
import type { Tag } from '@/type'
import { IdCardOutline } from '@vicons/ionicons5'

const emit = defineEmits<{
  edit: []
}>()

const id = defineModel<number | undefined>('id')
const title = defineModel<string | undefined>('title', { required: true })
const description = defineModel<string | undefined>('description', { required: true })
const tags = defineModel<Tag[]>('tags', { required: true })
const cover = defineModel<string | undefined | File>('cover', { required: true })
const banner = defineModel<string | undefined | File>('banner', { required: true })

function reset() {
  id.value = undefined
  title.value = undefined
  tags.value = []
  banner.value = undefined
  cover.value = undefined
}

const message = ref('')
</script>

<template>
  <div :class="$style.edit">
    <slot />

    <ImagePreview v-model="cover" :class="$style.cover_preview" />

    <div :class="$style.container">
      <div :class="$style.detail">
        <div :class="$style.id" v-if="id !== undefined">
          <IdCardOutline :class="$style.id_svg" />
          <span>{{ id }}</span>
        </div>

        <div :class="$style.title">
          <span>标签</span>
          <span :class="$style.message">{{ message }}</span>
        </div>
        <TagInput v-model="tags" v-model:message="message" :class="[$style.input, $style.tags_input]" />

        <div :class="$style.buttons">
          <button type="button" :class="$style.button" @click="emit('edit')">
            {{ id ? '修改' : '创建' }}
          </button>
          <button type="button" :class="$style.button" @click="reset">重置</button>
        </div>
      </div>

      <ImagePreview v-model="banner" :class="$style.banner_preview" />

      <div :class="$style.title">标题</div>
      <input type="text" :class="[$style.title_input, $style.input]" v-model="title" />

      <div :class="$style.title">简介</div>
      <textarea :class="[$style.description_input, $style.input]" v-model="description" />
    </div>
  </div>
</template>

<style module>
.edit {
  color: white;
  height: min-content;
  position: relative;
  /* min-width: 410px; */
}
.container {
  position: relative;
  background-color: #1e1e1e;
  margin-top: 60px;
  padding: 0 15px 15px 15px;
  height: calc(100% - 60px);
  overflow-y: auto;
  overscroll-behavior: none;
}
.title {
  margin: 5px 0;
  height: 25px;
  line-height: 25px;
}
.input {
  border: solid 2px gray;
  background-color: transparent;
  color: #fff;
}
.message {
  color: red;
  padding-left: 15px;
}
/* ==================== */
.cover_preview {
  z-index: 2;
  width: var(--coverWidth);
  height: calc(var(--coverWidth) * 1.5);
  position: absolute;
  left: 15px;
  background-color: #1e1e1e;
  border-color: #1e1e1e;
  border-bottom-color: gray;
  transition: all 0.2s;
}
/* ===================== */
.detail {
  z-index: 1;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  padding-left: calc(var(--coverWidth) + 15px);
  height: calc(var(--coverWidth) * 1.5 - 60px + 15px);
  padding-bottom: 15px;
  background-color: rgba(31, 31, 31, 0.7);
  backdrop-filter: blur(5px);
  transition: all 0.2s;
}
.id {
  position: relative;
  border: dashed 2px gray;
  padding-left: 30px;
  margin-top: 5px;
  height: 30px;
}
.id_svg {
  position: absolute;
  height: 20px;
  left: 5px;
  top: 3px;
}
/* ========================= */
.banner_preview {
  height: 200px;
  transition: all 0.2s;
}
.tags_input {
  flex: 1;
  height: 0;
  color: #fff;
}
.title_input {
  width: 100%;
  font-size: 25px;
}
.description_input {
  display: block;
  width: 100%;
  min-height: 180px;
}
/* ========== */
.buttons {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.button {
  border: solid 2px gray;
  background-color: transparent;
  color: #fff;
  padding: 5px 10px;
  min-width: 0;
  max-width: 100px;
  width: 100%;
}
.button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
@media screen and (max-width: 1200px) {
  .banner_preview {
    height: 150px;
  }
}
@media screen and (max-width: 600px) {
  .banner_preview {
    height: 120px;
  }
}
</style>
