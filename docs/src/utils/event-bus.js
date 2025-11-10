// 创建公众号对象
const eventHub = {
  // 创建缓存列表
  list: {
    
      // click:[f1,f2]
  },
// 订阅
  on: (name, fn)=>{
  // 如果对象中没有对应的 event 值，也就是说明没有订阅过，就给 event 创建个缓存列表
  // 如有对象中有相应的 event 值，把 fn 添加到对应 event 的缓存列表里
      eventHub.list[name] = eventHub.list[name]||[];
      eventHub.list[name].push(fn)
  },
// 发布
  emit: (name, data)=>{
      const q = eventHub.list[name];
      //如果缓存列表里面为空，就返回
      if(!q) return
      //遍历当前event里的缓存列表，并且依次执行
      q.map(f => f.call(null,data))
      return undefined;
  },
  off: (name, fn)=>{
      const q = eventHub.list[name];
      //如果缓存列表里面为空，就返回
      if(!q) return;
      //如果有，找到当前缓存列表里面对应的标号，并删除
      const index = q.indexOf(fn);
      if (index <0) return;
      q.splice(index,1)
  }
}
export default eventHub