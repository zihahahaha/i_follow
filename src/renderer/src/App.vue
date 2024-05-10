<script setup lang="ts">
import AsideBar from '@renderer/components/aside_bar'
import { transition } from './router'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

function wheel(e: Event) {
  e.preventDefault()
}
const beforeEnter = () => {
  console.log('enter')

  document.documentElement.style['pointerEvents'] = 'none'
  document.documentElement.style['overflow'] = 'hidden'
  console.log(document.body.style.overflow)

  window.addEventListener('wheel', wheel, {
    passive: false
  })
}
const afterEnter = () => {
  console.log('after-enter')

  document.documentElement.style['pointerEvents'] = ''
  document.documentElement.style['overflow'] = ''
  window.removeEventListener('wheel', wheel)
}

const route = useRoute()
const include = ref<string[]>([])
watch(route, () => {
  if (route.meta.keepAlive) {
    if (!include.value.includes(route.meta.name as string)) {
      include.value.push(route.meta.name as string)
    }
  } else {
    let index
    if ((index = include.value.indexOf(route.meta.name as string) !== -1)) {
      include.value.splice(index, 1)
    }
  }
})
</script>

<template>
  <AsideBar :class="$style.aside_bar" />
  <div :class="$style.context">
    <router-view v-slot="{ Component, route: a }">
      <KeepAlive :include="include">
        <component :is="Component" />
      </KeepAlive>
    </router-view>
  </div>
</template>

<style module>
.context {
  margin-left: var(--aside);
  width: calc(100% - var(--aside));
  position: relative;
}
body {
  --aside: 60px;
}
@media screen and (max-width: 1200px) {
  body {
    --aside: 50px;
  }
}
@media screen and (max-width: 760px) {
  body {
    --aside: 0px;
  }
  .aside_bar {
    display: none;
  }
}
</style>
