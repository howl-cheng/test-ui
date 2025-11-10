import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => {
    return {
      token: '', // token
    }
  },
  actions: {
    action_token (val) {
      this.token = val
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