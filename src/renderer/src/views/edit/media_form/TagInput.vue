<script setup lang="tsx">
import { computed, ref, defineComponent, useCssModule } from 'vue'
import { CloseSharp, OpenOutline } from '@vicons/ionicons5'
import { debounce } from '@renderer/utils'
import type { Tag } from 'src/api/type'
import { scannerOnce, scannerTwice } from '../../../components/scanner'
import Drawer from '@renderer/components/drawer/Drawer.vue'

const input = ref<HTMLInputElement>()
const input2 = ref<HTMLInputElement>()

const warning = ref(false)
const warningMessage = defineModel<string>('message')
const cancelWarn = debounce(1000, () => {
  warning.value = false
  warningMessage.value = ''
})
const warn = (message: string = '') => {
  warning.value = true
  warningMessage.value = message
  cancelWarn()
}
const noWarn = () => {
  warning.value = false
  warningMessage.value = ''
  cancelWarn.cancel()
}

function parseTage(str: string) {
  const tokens = scannerOnce(str)
  if (!(tokens instanceof Error)) {
    const tags = scannerTwice(tokens)
    if (!(tags instanceof Error)) {
      if (tags.length === 0 || tags.length > 1) {
        console.log('不允许空白或大于一个词')
        return new Error('不允许空白或大于一个词')
      } else return tags[0]
    } else return tags
  } else return tokens
}

const tag = ref<string>()
const tags = defineModel<Tag[]>({ required: true })

function tagPush(v?: string) {
  let tagValue: string
  if (v) tagValue = v
  else tagValue = tag.value!

  console.log(tagValue)

  const res = parseTage(tagValue)

  if (res instanceof Error) {
    warn(res.message)
    return
  } else if (tags.value.some((e) => e.namespace === res.namespace && e.value === res.value)) {
    warn('标签已存在')
    return
  } else {
    tags.value.push(res)
    console.log(res)
    tag.value = ''
    noWarn()
  }
}

function tagRemove(index: number) {
  tags.value!.splice(index, 1)
}

const show = ref(false)

// computed style
const color = computed(() => {
  return warning.value ? 'red' : ''
})

const $style = useCssModule()
const Tag = defineComponent({
  setup(props, context) {
    return () => (
      <div class={$style.tag}>
        <span>
          <span
            class={$style.namespace}
          >{`${props.namespace === 'temp' ? '' : props.namespace + ':'}`}</span>
          <span class={$style.value}>{props.value}</span>
        </span>
        <button
          type="button"
          class={$style.tag_close_button}
          onClick={() => tagRemove(props.index)}
        >
          <CloseSharp />
        </button>
      </div>
    )
  },
  props: {
    namespace: String,
    value: String,
    index: { type: Number, required: true }
  }
})
</script>

<template>
  <div
    :class="$style.tags"
    :style="{ 'border-color': color }"
    @mousedown.prevent="input?.focus"
    @dragenter.stop.prevent
    @dragover.stop.prevent
    @drop.stop.prevent="(e) => tagPush(e.dataTransfer?.getData('text'))"
  >
    <div :class="$style.container">
      <Tag v-for="(i, index) in tags" :namespace="i.namespace" :value="i.value" :index="index" />
      <input
        ref="input"
        type="text"
        :class="$style.tag_input"
        v-model="tag"
        @mousedown.stop
        @keydown.enter="() => tagPush()"
      />
    </div>

    <div :class="$style.open" @mousedown.stop>
      <button type="button" :class="$style.open_button" @click="show = true">
        <OpenOutline />
      </button>
    </div>

    <Drawer v-model="show">
      <template #header>
        <div :class="$style.message">{{ message }}</div>
      </template>
      <div :class="$style.drawer_container" @mousedown.prevent="input2?.focus">
        <Tag v-for="(i, index) in tags" :namespace="i.namespace" :value="i.value" :index="index" />
        <input
          ref="input2"
          type="text"
          :class="$style.tag_input"
          v-model="tag"
          @mousedown.stop
          @keydown.enter="() => tagPush()"
        />
      </div>
    </Drawer>
  </div>
</template>

<style module>
.tags {
  position: relative;
}
.container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  cursor: text;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: none;
}
.drawer_container {
  padding: 0 15px 15px 15px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  min-height: 100%;
  cursor: text;
  color: #fff;
}
.message {
  color: red;
  padding-left: 15px;
}
/* ============== */
.tag {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  color: inherit;
  margin: 5px;
  border-radius: 8px;
  padding: 0 8px;
  min-height: 25px;
  min-width: 25px;
  font-size: 16px;
  word-break: break-word;
  line-height: 23px;
}
.namespace {
  color: red;
  font-weight: 900;
  padding-right: 3px;
}
.value {
  color: inherit;
}
.tag_close_button {
  flex-shrink: 0;
  color: inherit;
  border-radius: 2px;
  width: 20px;
  height: 20px;
  border: none;
  padding: 0;
  background-color: transparent;
  margin-left: 3px;
}
.tag_close_button:hover {
  background-color: #ccc;
}
/* ============ */
.tag_input {
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  height: 25px;
  width: 0;
  flex: 1;
  line-height: 23px;
  margin: 5px;
  color: inherit;
}
/* ================ */
.open {
  display: none;
}
.open_button {
  border-radius: 5px;
}
.open_button:hover {
  background-color: #aaa;
}
@media screen and (max-width: 600px) {
  .tags {
    cursor: default;
  }
  .open {
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: auto;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .open:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
  .open:hover .open_button {
    display: block;
  }
  .open_button {
    display: none;
    border: none;
    background-color: transparent;
    width: 50px;
    padding: 0 10px;
    color: #fff;
  }
}
</style>
