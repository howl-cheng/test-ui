<template>
  <div :class="ns.b()">
    <template v-for="item in options">
      <span v-if="values.includes(item.value)" :key="item.value">{{ item.label }}</span>
    </template>
  </div>
</template>
<script lang="ts">
  export default { name: "h-dicts" }
</script>
<script setup lang="ts">
import { useNamespace } from '../../../../hooks'
import { computed } from 'vue'
const ns = useNamespace('dicts')
const props = withDefaults(defineProps<{
  options: { label: string, value: string }[]
  value: Array<number | string> | number | string | null
}>(), {
  options: () => [],
  value: null
})

const values = computed(() => {
  if (Array.isArray(props.value)) {
    return props.value.map((item: number | string) => item.toString())
  } else {
    return [props.value?.toString() || '']
  }
})
</script>