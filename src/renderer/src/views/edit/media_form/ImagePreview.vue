<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { AddCircleOutline, Resize, Trash } from '@vicons/ionicons5'
import { view } from '@renderer/components/common/imag_view'

const flag = ref(false)
const image = defineModel<string | undefined | File>({ required: true })
const imageUrl = ref<string>()

const dropFlag = ref(false)
const backgroundColor = computed(() => {
  return dropFlag.value ? 'rgba(255,255,255,0.2)' : 'transparent'
})

function deleteUrl(url?: string) {
  if (url) URL.revokeObjectURL(url)
}

function preview(e: MouseEvent | DragEvent) {
  console.log(e.type)
  if (e.type === 'click') {
    input.click()
  } else if (e.type === 'drop') {
    const ev = e as DragEvent
    const dt = ev.dataTransfer
    if (dt?.files.length !== 0) {
      image.value = dt?.files[0]
    } else if (ev.dataTransfer?.getData('text/uri-list')) {
      image.value = ev.dataTransfer?.getData('text/uri-list')
    }
  }
}

function showImage() {
  if (image.value === undefined) flag.value = false
  else flag.value = true
}

function processData(obj: File | undefined | string) {
  if (obj instanceof File) {
    console.log(obj)
    deleteUrl(imageUrl.value)
    imageUrl.value = URL.createObjectURL(obj)
  } else if (typeof obj === 'string') {
    deleteUrl(imageUrl.value)
    imageUrl.value = obj
  }
}

watch(
  image,
  (newValue) => {
    console.log(newValue)

    processData(newValue)
    showImage()
  },
  {
    immediate: true
  }
)

let input: HTMLInputElement
onMounted(() => {
  input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.addEventListener('change', () => {
    image.value = input.files?.[0]
    input.value = ''
  })
})

onUnmounted(() => {
  deleteUrl(imageUrl.value)
})
</script>

<template>
  <div :class="$style.image_preview">
    <button
      v-if="!flag"
      type="button"
      :class="$style.preview_button"
      @click="preview"
      @dragenter.stop.prevent
      @dragover.stop.prevent="dropFlag = true"
      @drop.stop.prevent="preview($event), (dropFlag = false)"
      @dragleave="dropFlag = false"
    >
      <AddCircleOutline :class="$style.preview_button_svg" />
    </button>
    <template v-else>
      <img :src="imageUrl" :class="$style.image" />
      <div :class="$style.image_tools">
        <button :class="$style.tools_button" @click="image = undefined">
          <Trash />
        </button>
        <button :class="$style.tools_button" @click="view(imageUrl)">
          <Resize />
        </button>
      </div>
    </template>
  </div>
</template>

<style module>
.image_preview {
  display: flex;
  justify-content: center;
  position: relative;
}
/* =============== */
.preview_button {
  width: 100%;
  height: 100%;
  border: dashed 2px gray;
  background-color: v-bind(backgroundColor);
  padding: 0;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.preview_button:hover {
  border-color: slateblue;
}
.preview_button_svg {
  width: 100%;
  height: 100%;
  max-width: 95px;
}
/* =============== */
.image {
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
  border-width: 2px;
  border-style: solid;
  border-color: inherit;
}
.image_tools {
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fff;
}
.tools_button {
  width: 50px;
  color: #fff;
  margin: 10px;
  border-radius: 5px;
  border: none;
  background-color: transparent;
}

.tools_button:hover {
  background-color: #aaa;
}
.image_preview:hover .image_tools {
  display: flex;
}
</style>
