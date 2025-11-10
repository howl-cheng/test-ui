<template>
  <div :class="[ns.b(), ns.m(size), ns.m(type)]" @click="handleClick">{{ label }}</div>
</template>

<script lang="ts"> 
  export default { name: "h-button" }
</script>

<script lang="ts" setup>
import { useNamespace } from "../../../../hooks"

type ButtonType = 'primary' | 'success' | 'error' | 'warning' | 'default'
type ButtonSize = 'small' | 'medium' | 'large'

const ns = useNamespace('button')

const props = defineProps({
  label: {
    type: String as () => string,
    default: 'button'
  },
  type: {
    type: String as () => ButtonType,
    default: ''
  },
  size: {
    type: String as () => ButtonSize,
    default: ''
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click', props.label)
}
</script>