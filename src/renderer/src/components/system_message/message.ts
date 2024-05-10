import Message from './Message.vue'
import Messages from './Messages.vue'
import { useMessage } from '../common/message'
import { type App, createApp } from 'vue'


const { message, messages } = useMessage()
const $message = (warningLevel: number, msg: string) => {
  message(Message, {
    warningLevel,
    message: msg
  })
}

let messageSingleton: App | undefined = undefined

export function useSystemMessage() {
  if (!messageSingleton) {
    const container = document.createElement('div')
    messageSingleton = createApp(Messages)
    messageSingleton.mount(container)
    document.body.appendChild(container)
  }
  return $message
}

export { messages }
