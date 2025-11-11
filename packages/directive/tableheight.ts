import type { DirectiveBinding } from 'vue'
// 为元素类型添加类型定义
export type TableHeightElement = HTMLElement & { style: CSSStyleDeclaration }

// 更新高度的函数
const updateHeight = (el: TableHeightElement, value: boolean) => {
  const searchRef = el.previousElementSibling as TableHeightElement | null;
  if (searchRef) {
    if (value) {
      el.style.height = `calc(100% - ${(searchRef.clientHeight + 10) / 100}rem)`;
    } else {
      el.style.height = '100%';
    }
  } else {
    console.warn('No previous sibling element found for height calculation.');
    el.style.height = '100%';
  }
}

const resizeH = {
  // 使用更精确的类型定义
  mounted: function (el: TableHeightElement, binding: DirectiveBinding<boolean>) {
    const { value } = binding;
    updateHeight(el, value);

    // 创建 ResizeObserver 监听父元素尺寸变化
    const resizeObserver = new ResizeObserver(() => {
      updateHeight(el, binding.value);
    });

    // 监听父元素的变化
    const parentElement = el.parentElement;
    if (parentElement) {
      resizeObserver.observe(parentElement);
    }

    // 同时监听前一个兄弟元素的变化（如果存在）
    const searchRef = el.previousElementSibling as TableHeightElement | null;
    if (searchRef) {
      resizeObserver.observe(searchRef);
    }

    // 将 ResizeObserver 实例存储到元素上，以便在卸载时清理
    (el as any)._resizeObserver = resizeObserver;
  },
  // 使用更精确的类型定义
  updated: function (el: TableHeightElement, binding: DirectiveBinding<boolean>) {
    const { value } = binding;
    updateHeight(el, value);
  },
  // 组件卸载时清理 ResizeObserver
  unmounted: function (el: TableHeightElement) {
    const resizeObserver = (el as any)._resizeObserver as ResizeObserver | undefined;
    if (resizeObserver) {
      resizeObserver.disconnect();
      delete (el as any)._resizeObserver;
    }
  },
}

export { resizeH }