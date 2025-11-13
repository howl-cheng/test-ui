import HbButton from './basis/button'
import HcHeader from './cockpit/header'
import HbBridgeInfo from './bridge/bridgeInfo'
import HbRoadInfo from './bridge/roadInfo'
import HbDicts from './basis/dicts'
const components = [HbButton, HcHeader, HbBridgeInfo, HbRoadInfo, HbDicts]

const install = (app: any) => {  // 明确 app 类型
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export { HbButton, HcHeader, HbBridgeInfo, HbRoadInfo, HbDicts }

export default install