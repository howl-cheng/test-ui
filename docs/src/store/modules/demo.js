import { defineStore } from 'pinia'

export const useDemoStore = defineStore('demo', {
  state: () => {
    return {
      activeItem: '', // 当前选中的组件
      code: '', // 当前选中的组件
      consoleLogs: [], // 控制台日志
      settingParams: {
        timeout: 80000,
        baseURL: '/dev-api',
        clientId: 'e5cd7e4891bf95d1d19206ce24a7b32e',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJzeXNfdXNlcjoxIiwicm5TdHIiOiJhaEZpUkI3eHJBNU53R2VOdHpCZm5RQk13YXBwOFgycSIsImNsaWVudGlkIjoiZTVjZDdlNDg5MWJmOTVkMWQxOTIwNmNlMjRhN2IzMmUiLCJ0ZW5hbnRJZCI6IjAwMDAwMCIsInVzZXJJZCI6MSwidXNlck5hbWUiOiJhZG1pbiIsImRlcHRJZCI6MTAwLCJkZXB0TmFtZSI6IumdkuWym-W4giJ9.WnwM-fUcO_54t4Enwas6zNwtdYVrw5Ie44unsruWSuk',
      }, // 设置参数
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
    },
    action_settingParams (val) {
      this.settingParams = val
    }
  },
  persist: {
    enabled: true, // true 表示开启持久化保存
    strategies: [
      {
        storage: localStorage, // 指定存储位置
        paths: ['settingParams'], // 指定存储字段
      }
    ]
  }
})