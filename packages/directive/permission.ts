// 存储用户权限列表
let permissionList: string[] = ['*:*:*']

/**
 * 设置用户权限列表
 * @param permissions 权限数组
 */
export const setPermissions = (permissions: string[]) => {
  permissionList = permissions || []
}

/**
 * 获取用户权限列表
 * @returns 权限数组
 */
export const getPermissions = (): string[] => {
  return permissionList
}

// 按钮权限指令
const hasPermi = {
  mounted(el: HTMLElement, binding: any) {
    const { value } = binding
    if (value && value instanceof Array && value.length > 0) {
      const hasPermissions = permissionList.some((permission) => {
        return permission === '*:*:*' || value.includes(permission)
      })

      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置操作权限标签值`)
    }
  },
  updated(el: HTMLElement, binding: any) {
    const { value } = binding
    if (value && value instanceof Array && value.length > 0) {
      const hasPermissions = permissionList.some((permission) => {
        return permission === '*:*:*' || value.includes(permission)
      })

      if (!hasPermissions && el.parentNode) {
        el.parentNode.removeChild(el)
      }
    }
  }
}

export { hasPermi }
