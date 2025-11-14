import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import './utils/rem'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import HnyUI, { setPermissions, setRequestParams } from 'hny-ui'
import 'hny-ui-styles'

const app = createApp(App)

setPermissions([
  'structure:roadInfo:query',
  'structure:roadInfo:edit',
  'structure:roadInfo:remove',
  'structure:roadInfo:add',
  'structure:roadInfo:export',
  'alarm:warnConfig:query',
  'alarm:warnConfig:edit',
  'alarm:warnConfig:remove',
  'alarm:warnConfig:add',
  'alarm:warnConfig:export',
])
setRequestParams({
  baseURL: '/dev-api',
  clientId: 'e5cd7e4891bf95d1d19206ce24a7b32e',
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJzeXNfdXNlcjoxIiwicm5TdHIiOiJhaEZpUkI3eHJBNU53R2VOdHpCZm5RQk13YXBwOFgycSIsImNsaWVudGlkIjoiZTVjZDdlNDg5MWJmOTVkMWQxOTIwNmNlMjRhN2IzMmUiLCJ0ZW5hbnRJZCI6IjAwMDAwMCIsInVzZXJJZCI6MSwidXNlck5hbWUiOiJhZG1pbiIsImRlcHRJZCI6MTAwLCJkZXB0TmFtZSI6IumdkuWym-W4giJ9.WnwM-fUcO_54t4Enwas6zNwtdYVrw5Ie44unsruWSuk',
  timeout: 80000,
})
//将element-plus提供的图标注册为全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
app.use(HnyUI)
app.mount('#app')
