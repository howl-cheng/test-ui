import { useDemoStore } from '@/store'

// 将控制台日志推送到 store
export function pushLog(type, ...args) {
  const demoStore = useDemoStore()
  demoStore.action_consoleLogs({ 
    type,
    time: new Date(),
    message: args.map((a) => {
      if (typeof a === 'string') return a
      try {
        return JSON.stringify(a)
      } catch (e) {
        return String(a)
      }
    }).join(' ')
  })
}

export function installConsoleHook() {
  if (installConsoleHook._installed) return
  installConsoleHook._installed = true

  const original = {
    log: console.log,
    warn: console.warn,
    error: console.error
  }

  console.log = (...args) => {
    original.log.apply(console, args)
    pushLog('log', ...args)
  }

  console.warn = (...args) => {
    original.warn.apply(console, args)
    pushLog('warn', ...args)
  }

  console.error = (...args) => {
    original.error.apply(console, args)
    pushLog('error', ...args)
  }
}


