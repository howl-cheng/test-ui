/**
 * BEM命名规范hooks
 * 提供默认命名空间和相关的BEM命名方法
 */
const defaultNamespace = 'h'
const statePrefix = "h-is-"
const _bem = (namespace: string, block: string, blockSuffix?: string, element?: string, modifier?: string) => {
  let classname = `${namespace}-${block}`
  if (blockSuffix) {
    classname += `-${blockSuffix}`
  }
  if (element) {
    classname += `__${element}`
  }
  if (modifier) {
    classname += `--${modifier}`
  }
  return classname
}

//生成BEM命名
export const useNamespace = (block: string) => {
  // 默认命名
  const namespace = defaultNamespace

  const b = (blockSuffix: string = '') => _bem(namespace, block, blockSuffix, '', '')
  const e = (element: string) => element ? _bem(namespace, block, '', element, '') : ''
  const m = (modifier: string) => modifier ? _bem(namespace, block, '', '', modifier) : ''
  const be = (blockSuffix: string, element: string) => blockSuffix && element ? _bem(namespace, block, blockSuffix, element, '') : ''
  const em = (element: string, modifier: string) => element && modifier ? _bem(namespace, block, '', element, modifier) : ''
  const bm = (blockSuffix: string, modifier: string) => blockSuffix && modifier ? _bem(namespace, block, blockSuffix, '', modifier) : ''
  const bem = (blockSuffix: string, element: string, modifier: string) => blockSuffix && element && modifier ? _bem(namespace, block, blockSuffix, element, modifier) : ''
  const is = (name: string, state: boolean = true) =>  name && state ? `${statePrefix}${name}` : ''
  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is
  }
}