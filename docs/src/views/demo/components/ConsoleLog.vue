<template>
  <div class="console-log">
    <div class="log-header">
      <div class="log-header-left">控制台日志</div>
      <div class="log-header-right">
        <el-button type="info" size="small" circle icon="Delete" @click="clearConsoleLogs"></el-button>
      </div>
    </div>
    <div class="log-content">
      <div class="log-content-item" v-for="log in consoleLogs" :key="log.id">
        <p>{{ log.time.toLocaleString() }} [{{ log.type }}]: {{ log.message }} </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useDemoStore } from '@/store'
import { installConsoleHook } from '@/utils/console-bus'
installConsoleHook()
const demoStore = useDemoStore()
const consoleLogs = computed(() => demoStore.consoleLogs)
const clearConsoleLogs = () => {
  demoStore.action_clearConsoleLogs()
}
</script>