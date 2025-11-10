import { defineStore } from 'pinia'

export const useDemoStore = defineStore('demo', {
  state: () => {
    return {
      activeItem: '', // 当前选中的组件
      code: '', // 当前选中的组件
      consoleLogs: [], // 控制台日志
    }
  },
  actions: {
    action_activeItem (val) {
      this.activeItem = val
    },
    action_code (val) {
      this.code = val
    },
    action_consoleLogs (val) {
      this.consoleLogs.push(val)
    },
    action_clearConsoleLogs () {
      this.consoleLogs = []
    },
    action_demo_clear () {
      this.activeItem = ''
      this.code = ''
      this.consoleLogs = []
    }
  },
  persist: {
    enabled: true, // true 表示开启持久化保存
    strategies: [
      {
        storage: localStorage, // 指定存储位置
        paths: ['token'], // 指定存储字段
      }
    ]
  }
})