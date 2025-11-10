import { hasPermi, setPermissions } from 'hny-ui'

const allDirective = { hasPermi }

export default {
  install (app) {
    //注册自定义组件全局组件
    Object.keys(allDirective).forEach(key => {
      app.directive(key, allDirective[key])
    })
  }
}