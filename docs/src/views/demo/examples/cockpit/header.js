export default `<template> 
  <div class="header-container">
    <h-c-header 
      title="驾驶舱头部标题" 
      url="/src/assets/images/header-bg.png" 
      :time="true" 
      :back="true"
      @enterBack="handleBack"
    />
  </div>
</template>
<script setup>
const handleBack = () => {
  console.log('handleBack')
}
</script>
<style scoped>
.header-container {
  width: 100%;
  height: 120px;
  background:rgb(247, 240, 240);
}
</style>`