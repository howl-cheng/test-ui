<template>
  <div class="demo-page">
    <div class="demo-sidebar-box">
      <SideBar />
    </div>
    <div class="demo-content-box" ref="demoContentBoxRef">
      <div class="row-content" :style="{ width: `calc(${rowContentWidth}% - 0.04rem)` }">
        <div class="view-box">
          <ComponentView />
        </div>
        <div class="console-box">
          <ConsoleLog />
        </div>
      </div>
      <div 
        class="resizer" 
        @mousedown="handleMouseDown"
      ></div>
      <div class="code-box" :style="{ width: codeBoxWidth + '%' }">
        <CodeEditor />
      </div>
    </div>
  </div>
</template>
<script setup>
import SideBar from './components/SideBar.vue';
import ComponentView from './components/ComponentView.vue';
import CodeEditor from './components/CodeEditor.vue';
import ConsoleLog from './components/ConsoleLog.vue';

const demoContentBoxRef = ref(null)
const rowContentWidth = ref(72)
const codeBoxWidth = ref(28)
const isDragging = ref(false)

const handleMouseDown = (e) => {
  isDragging.value = true
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
  e.preventDefault()
}

const handleMouseMove = (e) => {
  if (!isDragging.value || !demoContentBoxRef.value) return
  
  const boxRect = demoContentBoxRef.value.getBoundingClientRect()
  const mouseX = e.clientX - boxRect.left
  const totalWidth = boxRect.width
  const newRowWidth = (mouseX / totalWidth) * 100
  const newCodeWidth = 100 - newRowWidth
  
  // 限制最小宽度，避免区域太小
  if (newRowWidth >= 50 && newRowWidth <= 80) {
    rowContentWidth.value = newRowWidth
    codeBoxWidth.value = newCodeWidth
  }
}

const handleMouseUp = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}
</script>