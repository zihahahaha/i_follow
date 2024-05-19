<script setup lang="ts">
// import { views } from '@renderer/store/search_meta_views'
// import { ClipboardSearch24Regular } from '@vicons/fluent'
</script>

<template>
  <ul :class="$style.links">
    <li v-for="view in views">
      <RouterLink
        :class="$style.link"
        :to="{
          path: '/meta_search',
          query: {
            src: view.src,
            search: view.search
          }
        }"
      >
        <ClipboardSearch24Regular :class="$style.icon"/>
        <div :class="$style.search_source">{{ view.name }}</div>
      </RouterLink>
    </li>
  </ul>
</template>

<style module>
.links {
  padding: 0;
  position: relative;
  margin-left: 10px;
}
.link {
  position: relative;
  display: flex;
  text-decoration: none;
}
.source {

}
.icon {
  width: 25px;
  height: 25px;
}
</style>
