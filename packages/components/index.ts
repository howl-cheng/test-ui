import HbButton from './basis/button'
import HcHeader from './cockpit/header'
import HbBridgeInfo from './bridge/structure/bridgeInfo'
import HbRoadInfo from './bridge/structure/roadInfo'
import HbDicts from './basis/dicts'
import HbWarnConfig from './bridge/alarm/warnConfig'
import HbWarnTemplate from './bridge/alarm/warnTemplate'
const components = [HbButton, HcHeader, HbBridgeInfo, HbRoadInfo, HbDicts, HbWarnConfig, HbWarnTemplate]

const install = (app: any) => {  // 明确 app 类型
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export { HbButton, HcHeader, HbBridgeInfo, HbRoadInfo, HbDicts, HbWarnConfig, HbWarnTemplate }

export default install