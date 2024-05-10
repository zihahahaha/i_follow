import type { InjectionKey, Ref } from 'vue'

export const Flag = Symbol() as InjectionKey<Ref<boolean>>
