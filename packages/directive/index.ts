import { App } from 'vue'
import { hasPermi, setPermissions, getPermissions } from './permission'
import { resizeH } from './tableheight'
const allDirective = { hasPermi, resizeH }

/**
 * 指令安装函数
 * @param app Vue 应用实例
 */
const install = (app: App) => {
  // 注册所有自定义指令
  Object.keys(allDirective).forEach((key) => {
    app.directive(key, allDirective[key as keyof typeof allDirective])
  })
}

export { hasPermi, resizeH, setPermissions, getPermissions }

export default install
