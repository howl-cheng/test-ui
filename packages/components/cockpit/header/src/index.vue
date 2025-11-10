<template>
  <div :class="ns.b()" :style="{ backgroundImage: `url(${props.url})` }">
    <div :class="ns.e('left')">
      <template v-if="props.time">
        {{ realTime }}
      </template>
    </div>
    <div :class="ns.e('center')">
      {{ props.title }}
    </div>
    <div :class="ns.e('right')">
      <!-- <div v-if="props.back" :class="ns.e('back')" @click="handleBack">进入后台</div> -->
      <el-icon color="#409efc" @click="handleBack"><House /></el-icon>
    </div>
  </div>
</template>

<script lang="ts"> 
  export default { name: "h-c-header" }
</script>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useNamespace } from "../../../../hooks"
import { timeParse } from '../../../../utils'
const ns = useNamespace('c-header')
const timer = ref(null)
const props = defineProps({
  title: {
    type: String,
    default: '驾驶舱头部标题'
  },
  url: {
    type: String,
    default: ''
  },
  time: {
    type: Boolean,
    default: true
  },
  back: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['enterBack'])

const realTime = ref<string>('2025-11-03 10:00:00')

const initTime = () => {
  realTime.value = timeParse(new Date().getTime()) as string
}

const handleBack = () => {
  emits('enterBack')
}
onMounted(() => {
  initTime()
})
onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})
</script>
<style></style>
