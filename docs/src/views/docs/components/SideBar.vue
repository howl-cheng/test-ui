<template>
  <div class="demo-sidebar">
    <el-menu
      :default-active="defaultMenu"
      :unique-opened="true"
      @select="menuSelect"
    >
      <SideItem :menuData="sidebarList" />
    </el-menu>
  </div>
</template>
<script setup>
import SideItem from './SideItem.vue'
const router = useRouter()
const defaultMenu = ref('/docs/prepare')
const sidebarList = [
  { id: '/docs/prepare', title: '使用前准备'},
  { id: '/docs/install', title: '安装使用'},
  { id: '/docs/tools', title: '工具指令'},
]

const menuSelect = (key) => {
  router.push(key)
}
</script>