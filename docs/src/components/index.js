// svg图标组件
import SvgIcon from "./SvgIcon/index.vue";
// 引入element-plus提供的所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allComponent = { SvgIcon }

export default {
  install (app) {
    //注册自定义组件全局组件
    Object.keys(allComponent).forEach(key => {
      app.component(key, allComponent[key])
    })
    //将element-plus提供的图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}