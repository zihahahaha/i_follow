<script setup lang="ts">
import { NamespaceLang } from '@api/type/tag_system'
import { Tag } from '@api/type/tag_system';

const props = defineProps<{
  media: GetMedia | undefined
  tags: { [index: string]: string[] }
}>()
</script>

<template>
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
</template>

<style module>
.tags {
  flex-shrink: 0;
  width: 220px;
  height: min-content;
  background-color: #fff;
  margin: 15px 0px;
  margin-left: 10px;
  margin-right: 8px;
  padding: 15px;
}

.namespace {
  vertical-align: top;
  padding: 5px 0;
  line-height: 30px;
  font-weight: 900;
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

  background-color: #ecf0f4;
  color: #0069c2;
  text-wrap: nowrap;

  font-size: 10px;
}

@media screen and (max-width: 760px) {
  .tags {
    display: none;
  }
}
</style>
