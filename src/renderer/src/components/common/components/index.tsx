import { defineComponent, TransitionGroup } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  props: {
    is: {},
    components: Array as PropType<
      Array<{
        component: any
        props: object
      }>
    >
  },
  setup(props, { attrs }) {
    let component = props.is
    if (props.is === 'TransitionGroup') component = TransitionGroup
    return () => (
      <component {...attrs}>
        {props.components?.map(({ component: Component, props: componentProps }) => (
          <Component {...componentProps} />
        ))}
      </component>
    )
  }
})
