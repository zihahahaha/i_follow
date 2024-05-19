<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { GetMedia } from 'buffer/type'
import { CaretDownOutline } from '@vicons/ionicons5'
import Drawer from '../drawer/Drawer.vue'

// init data
const props = defineProps<{
  media: GetMedia | undefined
  tags: { [index: string]: string[] }
}>()

//style computed
const backgroundImage = computed(() => `url(${props?.media?.banner ? props?.media?.banner : ''})`)

// else
const bannerBs = ref(1)

const bannerTrigger = computed(() => {
  return {
    start: 30,
    end: bannerHeight.value + 70 - 60 - 40
  }
})
const coverTrigger = computed(() => {
  return {
    start: 70,
    end: 70 + bannerHeight.value - 40 - 10
  }
})

function calculateTrigger(trigger) {
  const { start, end } = trigger.value
  const scrollTop = document.documentElement.scrollTop
  return 1 - (1 / (end - start)) * (scrollTop - start)
}

function handleTrigger(trigger, brightness) {
  const scrollTop = document.documentElement.scrollTop
  const { start, end } = trigger.value
  if (scrollTop <= start) {
    brightness.value = 1
  } else if (scrollTop >= end) {
    brightness.value = 0
  } else {
    brightness.value = calculateTrigger(trigger)
  }
}

const handleHeader = () => {
  if (window.innerWidth > 760) {
    handleTrigger(bannerTrigger, bannerBs)
  } else {
    handleTrigger(coverTrigger, bannerBs)
  }
}

const bannerHeight = ref(350)
const descriptionHeight = ref(330)
function resize() {
  if (window.innerWidth > 1200) {
    bannerHeight.value = 350
    descriptionHeight.value = 330
  } else {
    bannerHeight.value = 280
    descriptionHeight.value = 260
  }
}

resize()
handleHeader()
console.log(bannerBs.value)

onMounted(() => {
  window.addEventListener('resize', resize)
  window.addEventListener('scroll', handleHeader)
  window.addEventListener('resize', handleHeader)
  // 有一个行为：mounted之后vue-router会scroll，会导致计算brightness出现一个transtition
})
onUnmounted(() => {
  window.removeEventListener('resize', resize)
  window.removeEventListener('scroll', handleHeader)
  window.removeEventListener('resize', handleHeader)
})

const tags = computed(() => {
  let length = 0
  const ary: string[] = []
  for (let namespace of Object.keys(props.tags)) {
    for (let value of props.tags[namespace]) {
      if (value.length > 40) continue
      if (length < 400) {
        length += value.length
        ary.push(value)
      }
    }
  }
  return ary
})

const show = ref(false)
function drawerResize() {
  if (window.innerWidth > 760) show.value = false
}
onMounted(() => {
  window.addEventListener('resize', drawerResize)
})
onUnmounted(() => {
  window.addEventListener('resize', drawerResize)
})
</script>

<template>
  <div
    :class="$style.banner"
    :style="{
      height: `${bannerHeight}px`
    }"
  >
    <div :class="$style.mobile">
      <img :class="$style.cover_mobile" :src="media?.cover" alt="" />

      <ul :class="$style.values">
        <li v-for="value in tags" :class="$style.value">{{ value }}</li>
      </ul>
      <div :class="$style.description">
        {{ props.media?.description.slice(0, 100) + ' ...' }}
      </div>
      <button type="button" :class="$style.more_button" @click="show = true">
        <CaretDownOutline />
      </button>
    </div>

    <Drawer v-model="show">
      <img :class="$style.more_cover" :src="media?.cover" alt="" />
      <div :class="$style.more_description">
        {{ props.media?.description.replace(/<[^>]*>/g, '') }}
      </div>
      <div :class="$style.tags">
        <template v-for="(values, namespace) in props.tags">
          <div :class="$style.namespace">
            {{ media?.namespaceLang?.[namespace] ? media?.namespaceLang?.[namespace] : namespace }}
          </div>
          <ul :class="$style.values">
            <li v-for="value in values" :class="$style.value">{{ value }}</li>
          </ul>
        </template>
      </div>
    </Drawer>
  </div>

  <div
    :class="$style.detail"
    :style="{
      height: `${descriptionHeight}px`
    }"
  >
    <div :class="$style.container">
      <img :class="$style.cover" :src="media?.cover" alt="" />
      <div>
        {{ props.media?.description.replace(/<[^>]*>/g, '') }}
      </div>
    </div>
  </div>
</template>

<style module>
/* ===================== */
.banner {
  z-index: -2;
  position: sticky;
  top: 0;
  width: 100%;
  margin-top: 70px;
  filter: brightness(v-bind(bannerBs));
  clip-path: inset(1px);
  transition:
    height 0.35s,
    filter 0.3s;
}
.banner::before {
  z-index: -1;
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: v-bind(backgroundImage);
  background-color: gray;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
/* ======================== */
.detail {
  z-index: -1;
  height: 330px;
  background-color: #fbfbfb;
  transition:
    height 0.35s,
    filter 0.3s;
  color: #404e5c;
}
.container {
  max-width: 1300px;
  margin: auto;
  padding: 0 15px;
  display: flex;
  gap: 25px;
}
.cover {
  width: 220px;
  height: 330px;
  position: relative;
  top: -60px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  border: solid 2px #fff;
  transition: all 0.3s;
}
/* ================== */
.mobile {
  display: none;
}
.cover_mobile {
  width: 150px;
  height: 225px;
  object-fit: cover;
  grid-row-start: span 3;
}
.tags {
  padding: 20px;
  padding-top: 0;
  color: white;
  height: min-content;
}
.namespace {
  text-wrap: nowrap;
  vertical-align: top;
  padding: 5px 0;
  line-height: 30px;
  min-width: 50px;
}
.values {
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  padding: 0;
  margin-left: 5px;
  max-height: 96px;
}
.value {
  border-radius: 10px;
  padding: 1px 5px;
  margin: 5px;
  margin-left: 0;
  min-width: 30px;
  min-height: 20px;
  font-size: 10px;
  line-height: 20px;
  text-align: center;
  background-color: #ecf0f4;
  color: #0069c2;
}
.description {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  color: #fff;
  padding-left: 5px;
}
.more_button {
  background-color: transparent;
  border: none;
  width: 28px;
  color: #fff;
  padding: 0;
  border-radius: 5px;
}
.more_button:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
.more_cover {
  display: block;
  margin: auto;
  width: 200px;
}
.more_description {
  margin-top: 15px;
  color: #fff;
  padding: 0 20px;
}
/* =============== */
@media screen and (max-width: 760px) {
  .banner::before {
    filter: brightness(0.7) blur(4px);
  }
  .mobile {
    width: 100%;
    height: 100%;
    padding: 30px 20px;
    display: grid;
    grid-template-columns: 150px auto;
    grid-template-rows: minmax(auto, 96px) 1fr 28px;
    column-gap: 10px;
    row-gap: 5px;
  }
  .detail {
    display: none;
  }
}
@media screen and (max-width: 1200px) {
  .cover {
    width: 200px;
    height: 300px;
  }
}
</style>
