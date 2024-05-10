<script setup lang="ts">
import type { GetMedia } from '@/type'
import { view } from '@renderer/components/common/imag_view'
import { useTags } from '@renderer/components/hook/tags'
import { toRef } from 'vue'
import type { Ref } from 'vue'
import { CloseCircleOutline } from '@vicons/ionicons5'

const props = defineProps<{
  media: GetMedia
  type: string
}>()
const emit = defineEmits<{
  remove: []
}>()

const tags = useTags(toRef(() => props.media) as Ref<GetMedia>)

function setData(e: DragEvent, namespace: string, value: string) {
  e.dataTransfer?.setData('text/plain', `"${namespace}":"${value}"`)
}
</script>

<template>
  <div :class="$style.source">
    <button type="button" :class="$style.close_button" @click="emit('remove')">
      <CloseCircleOutline />
    </button>
    <img :class="$style.cover" :src="media?.cover" alt="" />
    <div :class="$style.container">
      <img :class="$style.banner" :src="media?.banner" alt="" @click="view(props.media?.banner)" />
      <div :class="$style.namespace">来源</div>
      <div :class="$style.value" draggable="true" @dragstart="(e) => setData(e, 'source', type)">
        {{ props.type }}
      </div>
      <template v-for="(values, namespace) in tags">
        <div :class="$style.namespace">
          {{ media?.namespaceLang?.[namespace] ? media?.namespaceLang?.[namespace] : namespace }}
        </div>
        <ul :class="$style.values">
          <li
            v-for="value in values"
            :class="$style.value"
            draggable="true"
            @dragstart="(e) => setData(e, namespace as string, value)"
          >
            {{ value }}
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<style module>
.source {
  width: calc(var(--coverWidth) + 20px);
  height: min-content;
  position: relative;
  overflow: hidden;
  transition: all 0.2s;
  margin-bottom: 15px;
}

.close_button {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 13px;
  top: 3px;
  width: 30px;
  border: none;
  padding: 2px;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  border-radius: 10px;
  z-index: 1;
}
.close_button:hover {
  background-color: gray;
}

.cover {
  width: var(--coverWidth);
  height: calc(var(--coverWidth) * 1.5);
  position: absolute;
  left: 10px;
  top: 0;
  border: solid 2px white;
  border-bottom-color: gray;
  object-fit: cover;
  transition: all 0.2s;
}
.container {
  padding: 15px;
  margin-top: 60px;
  padding-top: calc(15px + var(--coverWidth) * 1.5 - 60px);
  background-color: #fff;
  transition: all 0.2s ease;
}
.banner {
  width: 100%;
  height: 46px;
  border: solid 2px gray;
  cursor: zoom-in;
  object-fit: cover;
}
.namespace {
  vertical-align: top;
  padding: 5px 0;
  line-height: 30px;
}
.values {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
}
.value {
  border-radius: 10px;
  padding: 1px 5px;
  margin: 5px;
  margin-left: 0;
  min-width: 30px;
  text-align: center;
  width: min-content;

  background-color: #ecf0f4;
  color: #0069c2;
  text-wrap: nowrap;

  font-size: 10px;
}
</style>
