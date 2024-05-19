import { useMetaSrc } from '@renderer/api'
import { assertIsDefined } from '@renderer/utils/assert'
import { NamespaceLang } from '@api/type/tag_system'
import { ref } from 'vue'
import type { Id, Meta } from '@api/type/meta'

export function useMetaView() {
  const loading = ref(false)
  const flagDialogShow = ref(false)
  const metaData = ref<Meta>()
  const namespaceLang = ref<NamespaceLang>()
  async function processParamView(srcId: string, id: Id) {
    const api = useMetaSrc(srcId)
    assertIsDefined(api)
    loading.value = true
    const res = await api.get(id).catch((err) => {
      //handle err
      return undefined
    })
    if (res) showMetaView(res)
    loading.value = false
  }
  async function showMetaView(meta: Meta) {
    const api = useMetaSrc(meta.srcId)
    assertIsDefined(api)
    flagDialogShow.value = true
    metaData.value = meta
    namespaceLang.value = await api.namespaceLang()
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
