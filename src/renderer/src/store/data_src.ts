import { ref } from 'vue'
import type { DataSrcInfo } from '@api/data/data'

const dataSrc = ref<DataSrcInfo[]>([])

export default {
  dataSrc
}
