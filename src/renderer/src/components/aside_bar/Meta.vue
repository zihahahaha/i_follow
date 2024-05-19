<script setup lang="ts">
import { BagHandleSharp, ChevronDown, Close } from '@vicons/ionicons5'
//
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import linkStyle from './link.module.css'
import state from '@renderer/store/search_meta_views'
//
const route = useRoute()
const router = useRouter()
const flagMetaShow = ref(false)
const angle = computed(() => (flagMetaShow.value ? '0deg' : '-90deg'))
//
const activeClass = computed(() => {
  if (route.name === 'search_meta') return linkStyle.active
  else return ''
})
function active(srcId: string) {
  if (route.name === 'manager_search_meta' && route.params.metaSrcId === srcId) {
    return linkStyle.active
  } else return ''
}
watchEffect(() => {
  for (let view of state.views.value) {
    if (route.name === 'manager_search_meta' && route.params.metaSrcId === view.srcId)
      flagMetaShow.value = true
  }
})
function removeView(srcId: string) {
  const index = state.views.value.findIndex((v) => v.srcId === srcId)
  if (index === 0) {
    router.push({
      path: '/'
    })
  } else {
    router.push({
      name: 'manager_search_meta',
      params: {
        metaSrcId: state.views.value[index - 1].srcId
      },
      query: {
        search: state.views.value[index - 1].search
      }
    })
  }
  state.remove(srcId)
}
</script>

<template>
  <div :class="$style.meta">
    <RouterLink
      :to="{
        path: '/'
      }"
      custom
      v-slot="{ navigate }"
    >
      <div :class="[$style.link, activeClass]">
        <a @click="navigate" :class="linkStyle.link">
          <BagHandleSharp :class="linkStyle.icon" />
          <div :class="linkStyle.text">元数据</div>
        </a>
        <button type="button" :class="$style.button" @click="flagMetaShow = !flagMetaShow">
          <ChevronDown />
        </button>
      </div>
    </RouterLink>

    <ul :class="$style.list" v-show="flagMetaShow">
      <li v-for="view in state.views.value" :class="[active(view.srcId), $style.link]">
        <RouterLink
          :class="linkStyle.link"
          :to="{
            name: 'manager_search_meta',
            params: {
              metaSrcId: view.srcId
            },
            query: {
              search: view.search
            }
          }"
        >
          <BagHandleSharp :class="linkStyle.icon" />
          <div :linkStyle.text>{{ view.name }}</div>
        </RouterLink>
        <button type="button" :class="$style.button" @click="removeView(view.srcId)">
          <Close />
        </button>
      </li>
    </ul>
  </div>
</template>

<style module>
.meta {
  overflow: hidden;
}
.list {
  padding: 0px;
}
.link {
  display: flex;
  align-items: center;
  border-radius: 15px;
  padding-right: 10px;
}
.list .link {
  padding-left: 15px;
}
.button {
  right: 0;
  width: 30px;
  height: 30px;
  border: none;
  padding: 5px;
  background-color: transparent;
  rotate: v-bind(angle);
}
.button:hover {
  color: #777;
}
</style>
