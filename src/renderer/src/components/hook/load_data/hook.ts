import type { Ref } from 'vue'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import type { SearchMedia } from '@/type'
import { throttle } from '@renderer/utils'
import { scanner } from '../../scanner'
import type { SearchFunc, SearchResult } from '@/type'

export function useLoadData(
  initNum: number,
  extraNum: number,
  search: SearchFunc<SearchResult>,
  filterString: Ref<string>
) {
  //tools
  const data = ref<{ media?: SearchMedia }[]>([])
  const loadedAmount = ref(0)
  let extraFlag = ref(false)
  let tags
  let loadFlag = false
  const loadTempData = (num: number) => {
    for (let i = 0; i < num; ++i) {
      data.value.push({})
    }
  }
  const clearExcessData = () => {
    const index = data.value.findIndex((e) => e.media === undefined)
    if (index !== -1) {
      const num = data.value.length - index
      data.value.splice(index, num)
    }
  }
  const clearData = () => {
    data.value = []
    loadedAmount.value = 0
  }

  //logic
  async function loadInitData() {
    console.log('load init data')

    clearData()
    loadTempData(initNum)

    tags = scanner(filterString.value)
    const filter = {
      tags,
      paging: { perPage: initNum, page: 1 }
    }

    const res = await search(filter).catch((err) => {
      console.log(err)
      return undefined
    })

    if (res) {
      console.log(res)

      res.medias.forEach((media, index) => (data.value[index].media = media))
      clearExcessData()
      loadedAmount.value += res.medias.length
      return res
    } else {
      console.log('loadInitData error')
      clearExcessData()
      return undefined
    }
  }

  async function loadExtraData() {
    console.log('load extra data')

    loadTempData(extraNum)

    const filter = {
      tags,
      paging: {
        perPage: extraNum,
        page: loadedAmount.value / extraNum
      }
    }
    const res = await search(filter).catch((err) => {
      console.log(err)
      return undefined
    })

    if (res) {
      res.medias.forEach((ele, index) => (data.value[loadedAmount.value + index - 1].media = ele))
      clearExcessData()
      loadedAmount.value += res.medias.length
      return res
    } else {
      console.log('loadExtraData error')

      clearExcessData()
      return undefined
    }
  }

  async function loadInit() {
    loadFlag = true
    const res = await loadInitData()
    loadFlag = false

    if (res) {
      extraFlag.value = res.pageInfo.hasNextPage
    } else {
      extraFlag.value = true
    }
  }

  async function loadExtra() {
    if (!extraFlag.value || loadFlag) return

    loadFlag = true
    const res = await loadExtraData()
    loadFlag = false

    if (res) {
      extraFlag.value = res.pageInfo.hasNextPage
    } else {
      extraFlag.value = true
    }
  }

  return {
    data,
    extraFlag,
    loadInit,
    loadExtra
  }
}

export function useLoadDataWithoutPreload(
  initNum: number,
  extraNum: number,
  search: Function,
  filterString: Ref<string>,
  eventTarget: Ref<EventTarget | undefined>
) {
  //tools
  const data = ref<SearchMedia[]>([])
  const amount = ref(0)
  let loadFlag = false
  let extraFlag = false
  let tags
  const clearData = () => {
    data.value = []
    amount.value = 0
  }

  //logic
  async function loadInitData() {
    clearData()

    tags = scanner(filterString.value)
    const filter = {
      tags,
      paging: { perPage: initNum, page: 1 }
    }

    const res = await search(filter).catch((err) => {
      console.log(err)
      return undefined
    })

    if (res) {
      res.medias.forEach((media) => {
        data.value.push(media)
      })
      return res
    }
  }

  async function loadExtraData() {
    const filter = {
      tags,
      paging: {
        perPage: extraNum,
        page: amount.value / extraNum
      }
    }
    const res = await search(filter).catch((err) => {
      console.log(err)
      return undefined
    })

    if (res) {
      res.medias.forEach((media) => {
        data.value.push(media)
      })
      return res
    } else {
      return undefined
    }
  }

  async function handleSearch() {
    loadFlag = true

    const res = await loadInitData()

    loadFlag = false
    extraFlag = res.pageInfo.hasNextPage
  }

  async function handleWhenToBottom() {
    if (!extraFlag) {
      return
    }
    loadFlag = true

    const res = await loadExtraData()

    loadFlag = false
    if (res) {
      extraFlag = res.pageInfo.hasNextPage
    } else {
      extraFlag = true
    }
  }

  const wheel = throttle(500, (e: WheelEvent) => {
    if (e.deltaY < 0) return false
    if (loadFlag) return false
    if (
      document.documentElement.scrollTop ===
      document.documentElement.scrollHeight - window.innerHeight
    ) {
      handleWhenToBottom()
      return true
    }
    return false
  })

  onMounted(() => {
    eventTarget.value?.addEventListener('wheel', wheel)
  })

  onUnmounted(() => {
    eventTarget.value?.removeEventListener('wheel', wheel)
  })

  return {
    data,
    handleSearch
  }
}
