<template>
  <div class="docs-page">
    <div class="left-sidebar">
      <SideBar />
    </div>
    <div class="right-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import SideBar from './components/SideBar.vue'

</script>