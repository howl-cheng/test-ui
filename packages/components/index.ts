import HbButton from './basis/button'
import HcHeader from './cockpit/header'
import HbBasicInfo from './bridge/basicInfo'
import HbStructureType from './bridge/structureType'
const components = [HbButton, HcHeader, HbBasicInfo, HbStructureType]

const install = (app: any) => {  // 明确 app 类型
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export { HbButton, HcHeader, HbBasicInfo, HbStructureType  }

export default install