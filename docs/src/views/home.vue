<template>

  <div class="banner">
    <img src="@/assets/icons/logo.png" alt="logo" class="banner-logo">
    <div class="banner-title">HNY-UI</div>
    <div class="banner-desc">一个漂亮且高效的 Vue3 页面级组件库</div>
    <div class="banner-actions">
      <button class="primary-btn" @click="handleQuickStart">快速开始</button>
      <button class="gray-btn" @click="handleExampleDemo">示例演示</button>
    </div>
  </div>
</template>
<script setup>
const router = useRouter()
const handleQuickStart = () => {
  router.push('/docs')
}
const handleExampleDemo = () => {
  router.push('/demo')
}
</script>
<style scoped lang="scss">

  .banner {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #c5e3ff 0%, #f5fafb 100%);
    border-radius: 14px;
    box-shadow: 0 2px 12px rgba(71, 110, 180, .08);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .banner-logo {
      width: 0.9rem;
      height: 0.9rem;
      margin-bottom: 0.2rem;
    }

    .banner-title {
      font-size: 0.36rem;
      font-weight: 700;
      color: #223457;
      letter-spacing: 1px;
      margin-bottom: 0.1rem;
    }

    .banner-desc {
      font-size: 0.17rem;
      color: #555;
      margin-bottom: 1rem;
    }

    .banner-actions {
      display: flex;
      gap: 0.2rem;

      .primary-btn {
        background: linear-gradient(120deg, #54b2ec 0%, #74df8c 100%);
        color: #fff;
        font-weight: 600;
        border: none;
        border-radius: 6px;
        padding: 0.12rem 0.36rem;
        font-size: 0.16rem;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(50, 160, 190, .12);
        transition: background 0.2s;

        &:hover {
          background: linear-gradient(120deg, #3391c0 0%, #67b769 100%);
        }
      }

      .gray-btn {
        border: 1px solid #d1d8e6;
        background: #fff;
        color: #223457;
        border-radius: 6px;
        padding: 0.11rem 0.33rem;
        font-size: 0.16rem;
        text-decoration: none;
        font-weight: 500;
        transition: all .2s;

        &:hover {
          border-color: #52bfae;
          color: #52bfae;
        }
      }
    }
  }
</style>