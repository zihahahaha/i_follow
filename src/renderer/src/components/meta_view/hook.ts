import state from '@renderer/store/meta_src'
import { assertIsDefined } from '@renderer/utils/assert'
import { NamespaceLang } from '@api/type/tag_system'
import { ref } from 'vue'
import type { Meta } from '@api/metas/meta'
import type { Id } from '@api/type/common'
import { metaSrc as api } from '@renderer/api'

export function useMetaView() {
  const loading = ref(false)
  const flagDialogShow = ref(false)
  const metaData = ref<Meta>()
  const namespaceLang = ref<NamespaceLang>()
  async function processParamView(srcId: string, id: Id) {
    loading.value = true
    const res = await api.get(srcId, id).catch((err) => {
      //handle err
      return undefined
    })
    if (res) showMetaView(res)
    loading.value = false
  }
  async function showMetaView(meta: Meta) {
    const metaSrc = state.metaSrc.value.find((el) => el.id === meta.srcId)
    assertIsDefined(metaSrc)
    flagDialogShow.value = true
    metaData.value = meta
    namespaceLang.value = metaSrc.namespaceLang
  }

  return {
    loading,
    flagDialogShow,
    metaData,
    namespaceLang,
    processParamView,
    showMetaView
  }
}
