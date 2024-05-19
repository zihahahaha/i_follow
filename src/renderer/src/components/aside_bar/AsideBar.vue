<script setup lang="ts">
import { LibrarySharp } from '@vicons/ionicons5'
import { Save24Filled, SaveEdit24Filled, ClipboardSearch24Regular } from '@vicons/fluent'
import Meta from './Meta.vue'
import Icon from './icon.vue'
//
import { useRoute } from 'vue-router'
import { computed, useCssModule } from 'vue'
import linkStyle from './link.module.css'

// import MetaSearchLinks from './MetaSearchLinks.vue'

const route = useRoute()
const $style = useCssModule()
const metaSearch = computed(() => {
  if (route.name === 'manager_search_meta' || route.name === 'search_meta') return $style.active
  else return ''
})
</script>

<template>
  <div :class="$style.aside_bar">
    <Icon />

    <Meta />

    <RouterLink to="/collection" :class="linkStyle.link">
      <LibrarySharp :class="linkStyle.icon" />
      <div>本地数据</div>
    </RouterLink>

    <!-- <RouterLink
      v-if="collectMedia.state.value.length > 0 || editMedia.editFlag.value"
      to="/edit"
      :class="[$style.link, $style.edit]"
      :active-class="$style.active"
    >
      <div :class="$style.edit_amount" v-if="collectMedia.state.value.length > 0">
        {{ collectMedia.state.value.length }}
      </div>
      <Save24Filled v-if="editMedia.editFlag.value && collectMedia.state.value.length > 0" />
      <SaveEdit24Filled v-else />
    </RouterLink> -->
  </div>
</template>

<style module>
.aside_bar {
  padding-left: 5px;
  padding-right: 10px;
  position: fixed;
  left: 0;
  top: 0;
  width: var(--aside);
  height: 100vh;
  z-index: 3;
  background-color: #f5f5f5;
}
.link {
  display: flex;

  width: 100%;
  cursor: pointer;
  color: #000;
  text-decoration: none;
  font-size: 18px;
  height: 30px;
  line-height: 30px;
  gap: 2px;
}
.icon {
  width: 30px;
  height: 30px;
  padding-bottom: 3px;
  border-radius: 100%;
  background-color: gray;
}

.active {
  color: blue !important;
}

.edit {
  position: relative;
}
.edit_amount {
  position: absolute;
  right: 0;
  top: 0;
  width: 15px;
  height: 15px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: orange;
  color: #fff;
}
</style>
