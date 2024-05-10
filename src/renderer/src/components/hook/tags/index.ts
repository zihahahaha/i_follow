import { computed, type Ref } from 'vue'
import type { GetMedia } from '@/type'

export function useTags(data: Ref<GetMedia>) {
  const tags = computed(() => {
    let tagsAggreation: { [index: string]: string[] } = {}
    if (data.value)
      for (let i of data.value?.tags) {
        if (tagsAggreation[i.namespace] === undefined) tagsAggreation[i.namespace] = [i.value]
        else tagsAggreation[i.namespace].push(i.value)
      }
    return tagsAggreation
  })
  return tags
}
