
import { createRouter, createWebHistory } from "vue-router"

let routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/demo',
        name: 'Demo',
        component: () => import('@/views/demo/index.vue'),
        meta: {
          title: '示例'
        }
      },
      {
        path: '/docs',
        name: 'Docs',
        component: () => import('@/views/docs/index.vue'),
        meta: {
          title: '文档'
        },
        redirect: '/docs/prepare',
        children: [
          {
            path: '/docs/prepare',
            name: 'Prepare',
            component: () => import('@/views/docs/docment/prepare/index.vue'),
          },
          {
            path: '/docs/install',
            name: 'Install',
            component: () => import('@/views/docs/docment/install/index.vue'),
          },
          {
            path: '/docs/tools',
            name: 'Tools',
            component: () => import('@/views/docs/docment/tools/index.vue'),
          },
        ]
      }
    ]
  }
]
// 路由
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 