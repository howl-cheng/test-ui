<template>
  <div class="demo-sidebar">
    <el-menu
      :default-active="defaultMenu"
      :unique-opened="true"
      @select="loadComponentCode"
    >
      <SideItem :menuData="sidebarList" />
    </el-menu>
  </div>
</template>
<script setup>
import { useDemoStore } from '@/store'
import SideItem from './SideItem.vue'

const demoStore = useDemoStore()
const defaultMenu = ref('basis/button')
const sidebarList = [
  {
    id: 'basis',
    title: '基础组件',
    children: [
      {id: 'basis/button', title: '按钮'},
    ]
  },
  {
    id: 'bridge',
    title: '桥梁3.0',
    children: [
      {
        id: 'bridge/structure',
        title: '结构物管理',
        children: [
          {id: 'bridge/structure/bridgeInfo', title: '桥梁基础信息'},
          {id: 'bridge/structure/roadInfo', title: '道路基础信息'},
        ]
      },
      {
        id: 'bridge/alarm',
        title: '报警信息管理',
        children: [
          {id: 'bridge/alarm/warnConfig', title: '预警推送配置'},
          {id: 'bridge/alarm/warnTemplate', title: '预警推送模板'},
        ]
      }
    ]
  },
  { id: 'cockpit',
    title: '驾驶舱组件',
    children: [
      {id: 'cockpit/header', title: '驾驶舱头部'},
    ]
  }
]

// 加载组件代码
const loadComponentCode = async (id) => {
  try {
    const module = await import(/* @vite-ignore */ `../examples/${id}.js`)
    demoStore.action_code(module.default)
    demoStore.action_activeItem(id)
  } catch (error) {
    demoStore.action_code(`// 加载${id}示例代码失败`);
  }
}
loadComponentCode('basis/button')
onUnmounted(() => {
  demoStore.action_demo_clear()
})

</script>