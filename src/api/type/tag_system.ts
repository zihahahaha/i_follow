export interface Tag {
  namespace: string
  value: string
}

export interface NamespaceLang {
  [namespace: string]: string
}

export type Filter = Tag[]

type namespaceLang = () => Promise<NamespaceLang>

export { namespaceLang }
