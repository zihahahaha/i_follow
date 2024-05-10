<script setup lang="ts">
import { BagHandleSharp, LibrarySharp } from '@vicons/ionicons5'
import { Save24Filled, SaveEdit24Filled } from '@vicons/fluent'
import { collectMedia, editMedia } from '@renderer/store'

</script>

<template>
  <div :class="$style.aside_bar">
    <RouterLink to="/" :class="$style.link" :active-class="$style.active">
      <BagHandleSharp />
    </RouterLink>
    <RouterLink to="/collection" :class="$style.link" :active-class="$style.active">
      <LibrarySharp />
    </RouterLink>
    <RouterLink
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
    </RouterLink>
  </div>
</template>

<style module>
.aside_bar {
  padding: 0 5px;
  position: fixed;
  left: 0;
  top: 0;
  width: var(--aside);
  height: 100vh;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  z-index: 3;
  background-color: #fff;
}
.link {
  box-sizing: border-box;
  border: solid 1px transparent;
  width: 100%;
  display: block;
  cursor: pointer;
  background-color: transparent;
  color: #000;
}
.link:hover {
  border: dotted 1px blue;
  background-color: rgba(0, 0, 255, 0.1);
}
.link:active {
  color: unset;
}
.link:visited {
  color: unset;
}
.active {
  color: blue;
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
.edit_loaded {
}
</style>
