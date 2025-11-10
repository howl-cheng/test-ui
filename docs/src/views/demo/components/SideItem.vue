<template>
  <template v-for="menu in menuData">
    <template v-if="menu.children && menu.children.length">
      <el-sub-menu :key="menu.id" :index="menu.id">
        <template #title>
          <span class="title">{{ menu.title }}</span>
        </template>
        <SideItem :menuData="menu.children" />
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :key="menu.id" :index="menu.id">
        <template #title>
          <span class="sub-icon"></span>
          <span>{{ menu.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup name="MeunItem">
const props = defineProps({
  menuData: {
    type: Array,
    default: () => {
      return []
    }
  },
})

</script>
