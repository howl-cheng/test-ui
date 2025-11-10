<template>
  <!-- svg 外层容器节点，内部需要使用use标签结合使用 -->
  <!-- style设置图标大小 -->
  <i class="svg-icon" :style="{ fontSize: width }">
    <svg :style="{ width, height }">
      <!-- xlink:href执行行使用哪个图标，属性值务必#icon-图标名字 -->
      <!-- fill属性是设置颜色 -->
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </i>
</template>

<script setup>
defineProps({
  //图标前缀
  prefix: {
    type: String,
    default: "#icon-"
  },
  //图标名称
  name: {
    type: String,
    default: ""
  },
  // 图标颜色
  color: {
    type: String,
    default: ""
  },
  // 图标宽
  width: {
    type: String,
    default: "0.2rem"
  },
  // 图标高
  height: {
    type: String,
    default: "0.2rem"
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>