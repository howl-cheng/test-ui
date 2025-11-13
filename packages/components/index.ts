import HbButton from './basis/button'
import HcHeader from './cockpit/header'
import HbBridgeInfo from './bridge/bridgeInfo'
import HbStructureType from './bridge/structureType'
import HbDicts from './basis/dicts'
const components = [HbButton, HcHeader, HbBridgeInfo, HbStructureType, HbDicts]

const install = (app: any) => {  // 明确 app 类型
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export { HbButton, HcHeader, HbBridgeInfo, HbStructureType, HbDicts }

export default install