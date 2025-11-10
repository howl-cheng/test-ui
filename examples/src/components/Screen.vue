<template>
  <div class="screen-container">
    <div class="screen-map">
    </div>
    <div class="screen-header">
      <h-c-header 
        title="驾驶舱头部标题" 
        url="/src/assets/images/header-bg.png" 
        :time="true" 
        :back="true"
        @enterBack="handleBack"
      />
    </div>
  </div>
</template>
<script setup>
const handleBack = () => {
  console.log('handleBack')
}
</script>
<style scoped lang="scss">
.screen-container {
  width: 100%;
  height: 100%;
  position: relative;
  .screen-map {
    width: 100%;
    height: 100%;
    background-color: #e8eef0;
  }
  .screen-header {
    width: 100%;
    height: 120px;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>