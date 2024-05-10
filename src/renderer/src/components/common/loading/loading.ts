import { createApp } from 'vue'
import defaultStyle from './loading.module.css'
import type { Component } from 'vue'

function addStyle(e: HTMLElement, style: object) {
  for (const [key, value] of Object.entries(style)) {
    e.style[key] = value
  }
}

function addClass(e: HTMLElement, classNames: string[]) {
  for (let className of classNames) {
    e.classList.add(className)
  }
}

export function useLoading(Loading: Component, style?: object, classNames?: string[]) {
  let container: HTMLElement
  let app
  return (flag: boolean) => {
    if (flag) {
      container = document.createElement('div')
      container.classList.add(defaultStyle.loading)
      if (style) addStyle(container, style)
      if (classNames) addClass(container, classNames)
      document.body.appendChild(container)
      app = createApp(Loading)
      app.mount(container)
    } else {
      app.unmount()
      if (container) {
        document.body.removeChild(container)
      }
    }
  }
}
