<template>
  <div class="index-page">
    <div class="page-header">
      <div class="header-left">
        <img src="@/assets/icons/logo.png" alt="hny-ui">
        <span>hny-ui</span>
      </div>
      <div class="header-right">
        <router-link to="/home" custom v-slot="{ navigate, isActive }">
          <span :class="{ active: isActive }" @click="navigate">首页</span>
        </router-link>
        <router-link to="/docs" custom v-slot="{ navigate, isActive }">
          <span :class="{ active: isActive }" @click="navigate">文档</span>
        </router-link>
        <router-link to="/demo" custom v-slot="{ navigate, isActive }">
          <span :class="{ active: isActive }" @click="navigate">示例</span>
        </router-link>
      </div>
    </div>
    <div class="page-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
</script>

<style scoped lang="scss">
.index-page{
  width: 100%;
  height: 100%;
  background: #cac2c2;
  overflow: auto;
  .page-header {
    width: 100%;
    height: 0.6rem;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.2rem;
    .header-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0.1rem;
      img {
        width: 0.4rem;
        height: 0.4rem;
      }
      span {
        color: #081642;
        font-weight: 600;
      }
    }
    .header-right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 0.1rem;
      span {
        color: #081642;
        font-size: 0.14rem;
        cursor: pointer;
        &:hover {
          color: #95c6f5;
        }
      }
      .active {
        color: #95c6f5;
      }
    }
  }
  .page-content {
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 0.8rem 0.2rem 0.2rem;
  }
}
</style>