<script setup lang="ts">
import AsideBar from '@renderer/components/aside_bar'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// function wheel(e: Event) {
//   e.preventDefault()
// }
// const beforeEnter = () => {
//   console.log('enter')

//   document.documentElement.style['pointerEvents'] = 'none'
//   document.documentElement.style['overflow'] = 'hidden'
//   console.log(document.body.style.overflow)

//   window.addEventListener('wheel', wheel, {
//     passive: false
//   })
// }
// const afterEnter = () => {
//   console.log('after-enter')

//   document.documentElement.style['pointerEvents'] = ''
//   document.documentElement.style['overflow'] = ''
//   window.removeEventListener('wheel', wheel)
// }

const router = useRouter()

const include = ref<string[]>([])
// ensure leave view meta
router.beforeEach((to, from) => {
  if (from.meta.keepAlive) {
    if (!include.value.includes(from.meta.name as string)) {
      include.value.push(from.meta.name as string)
    }
  } else {
    let index
    if ((index = include.value.indexOf(from.meta.name as string) !== -1)) {
      include.value.splice(index, 1)
    }
  }
})
// ensure entered view meta
router.beforeResolve((to) => {
  if (to.meta.keepAlive) {
    if (!include.value.includes(to.meta.name as string)) {
      include.value.push(to.meta.name as string)
    }
  } else {
    let index
    if ((index = include.value.indexOf(to.meta.name as string) !== -1)) {
      include.value.splice(index, 1)
    }
  }
})

// import Test from './test.vue'

// const show = ref(true)
// let flag = ref(false)
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
  <!-- <button @click="show = !show">SHOW</button>
  <button @click="flag = !flag">ALIVE: {{ flag }}</button>
  <KeepAlive :include="flag ? 'test' : 'xx'">
    <Test v-if="show" />
  </KeepAlive> -->
</template>

<style module>
.context {
  margin-left: var(--aside);
  width: calc(100% - var(--aside));
  min-height: 100vh;
  height: 0;
  position: relative;
}
body {
  --aside: 200px;
}
/* @media screen and (max-width: 1200px) {
  body {
    --aside: 50px;
  }
} */
@media screen and (max-width: 760px) {
  body {
    --aside: 0px;
  }
  .aside_bar {
    display: none;
  }
}
</style>
