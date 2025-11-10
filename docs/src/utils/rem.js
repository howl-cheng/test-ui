// 基准大小
const baseSize = 100
// 设置 rem 函数
const setRem = () => {
  const screenWidth = document.documentElement.clientWidth
  const baseWidth = 1920
  document.documentElement.style.fontSize = baseSize * Math.min(screenWidth / baseWidth, 2) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.addEventListener('resize', setRem)