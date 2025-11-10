import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import HnyUI, { setPermissions } from 'hny-ui'
import 'hny-ui-styles'

const app = createApp(App)

setPermissions(['bridge:basicInfo:search', 'bridge:basicInfo:reset', 'bridge:basicInfo:view', 'bridge:basicInfo:edit', 'bridge:basicInfo:delete'])
//将element-plus提供的图标注册为全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
app.use(HnyUI)
app.mount('#app')
