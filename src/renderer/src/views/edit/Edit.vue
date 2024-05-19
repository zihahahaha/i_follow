<script setup lang="ts">
import { ref, toRaw, watch } from 'vue'
import { CaretDownCircleOutline } from '@vicons/ionicons5'
import Search from './Search.vue'
import { useLoading } from '@renderer/components/common/loading'
import Loading from '@renderer/components/Loading.vue'
import { Messages, Message } from '@renderer/views/edit/edit_message'
import { useMessage } from '@renderer/components/hook/message'
import MediaForm from './media_form'
import Source from './Source.vue'
import { api } from '@renderer/api/local'
import { collectMedia } from '@renderer/store'
import { editMedia } from '@renderer/store'

const { id, title, tags, cover, banner, description } = editMedia.state
async function handleGet(_id: number) {
  editMedia.set(_id)
}

async function upload() {
  console.log(title.value)
  console.log(banner.value)
  console.log(cover.value)
  console.log(tags.value)

  const res = await api.insert({
    title: title.value as string,
    cover: cover.value as string,
    banner: banner.value as string,
    description: description.value as string,
    tags: toRaw(tags.value)
  })
  console.log(res)
  return res
}

async function handleEdit() {
  if (id.value === undefined) {
    if (!title.value) {
      $message('标题不能为空')
      return
    }
    if (!cover.value) {
      $message('封面不能为空')
      return
    }
    if (!banner.value) {
      $message('横幅不能为空')
      return
    }
    if (!description.value) {
      $message('描述不能为空')
      return
    }
    loading(true)
    const urls = await api.uploadFiles([cover.value, banner.value])
    if (urls) {
      cover.value = urls[0]
      banner.value = urls[1]
      console.log(urls)
      const res = await upload()
      id.value = res?.id
    } else {
      $message('图片上传失败')
    }
    loading(false)
  } else {
    $message('修改数据')
  }
}

const show = ref(false)

const loading = useLoading(Loading, { backgroundColor: 'rgba(0, 0, 0, 0.5)' })

const { message, messages } = useMessage(1500)
const $message = (msg: string) => {
  message(Message, {
    message: msg
  })
}
</script>

<template>
  <div :class="$style.edit">
    <button type="button" :class="[$style.button, $style.down_button]" @click="show = true">
      <CaretDownCircleOutline />
    </button>

    <MediaForm
      @edit="handleEdit"
      :class="$style.edit_data"
      v-model:id="id"
      v-model:title="title"
      v-model:tags="tags"
      v-model:banner="banner"
      v-model:description="description"
      v-model:cover="cover"
    >
      <Search :class="$style.search" @get="handleGet" />
    </MediaForm>

    <div :class="$style.src">
      <TransitionGroup
        :leave-active-class="$style.leave_active"
        :move-class="$style.active"
        :leave-to-class="$style.leave_to"
      >
        <template v-for="source in collectMedia.state.value" :key="source.id + source.type">
          <Source
            v-if="source.media"
            :type="source.type"
            :media="source.media"
            @remove="collectMedia.remove(source.id, source.type)"
          />
        </template>
      </TransitionGroup>
    </div>

    <!-- <Down v-model="show">
      <Source :media="media" />
    </Down> -->

    <Messages :messages="messages" />
  </div>
</template>

<style module>
.edit {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
  width: 100%;
  margin: auto;
  background-color: #333333;
  z-index: 5;
  padding: 15px;
  padding-top: 58px;
  display: flex;
}
.button {
  border: none;
  background-color: transparent;
  padding: 5px;
  width: 50px;
  height: 50px;
  color: #fff;
}
.button:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
.down_button {
  display: none;
  position: fixed;
  left: calc((100% - var(--aside)) / 2 + var(--aside));
  top: 5px;
  transform: translateX(-50%);
}
.edit_data {
  flex: 1;
  height: 100%;
  position: sticky;
  top: 0;
}
.src {
  flex-shrink: 0;
  margin-left: 15px;
}
/* ============= */
.active {
  transition: all 0.5s;
}
.leave_active {
  transition: all 0.5s;
  position: absolute;
}
.leave_to {
  translate: 100% 0;
}
/* ======================================== */
@media screen and (min-width: 1201px) {
  .edit {
    --coverWidth: 220px;
  }
}

@media screen and (max-width: 1200px) {
  .edit {
    --coverWidth: 200px;
  }
}

@media screen and (max-width: 760px) {
  .edit {
    --coverWidth: 160px;
  }
  .src {
    display: none;
  }
  .down_button {
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .edit {
    --coverWidth: 100px;
  }
}
</style>
