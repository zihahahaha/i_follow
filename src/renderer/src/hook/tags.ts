import { Tag } from '@api/type/tag_system'

export function useTagsAggreation(tags: Tag[]) {
  const tagsAggreation: { [index: string]: string[] } = {}
  for (let tag of tags) {
    if (tagsAggreation[tag.namespace] === undefined) tagsAggreation[tag.namespace] = [tag.value]
    else tagsAggreation[tag.namespace].push(tag.value)
  }
  return tagsAggreation
}
