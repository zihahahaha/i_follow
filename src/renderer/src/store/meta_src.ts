import { ref } from 'vue'
import type { MetaSrcInfo } from '@api/metas/meta'

const metaSrc = ref<MetaSrcInfo[]>([])

export default {
  metaSrc
}
