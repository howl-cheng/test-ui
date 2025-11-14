import { createApp } from 'vue'
import '@/styles/index.scss' // 公共样式
import '@/utils/rem.js' // remx
import 'virtual:svg-icons-register' // svg
import globalComponents from '@/components/index'
import globalDirective from '@/directive/index'
import '@/routes/permission.js' // 路由拦截
import App from './App.vue'
import router from "@/routes/index";
import pinia from '@/store/index.js'
// md代码高亮UI
import 'highlight.js/styles/github.css'

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// hny-ui
import  HnyUI from 'hny-ui'
import 'hny-ui/styles'

const app = createApp(App)
app.use(globalComponents) // 全局组件注册
app.use(globalDirective)
app.use(ElementPlus)
app.use(HnyUI)
app.use(pinia)
app.use(router)
app.mount('#app')
