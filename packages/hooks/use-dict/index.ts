import { ref, toRefs } from 'vue'
import { dictsApi } from '../../components/basis/dicts/src/api'


export const useDict = (dicts: string[]) => {
  let dictStore = ref<Record<string, any>>({})
  
  dicts.forEach((dict) => {
    dictStore.value[dict] = []
    dictsApi(dict).then((res: any) => {
      dictStore.value[dict] = res.data.map((item: any) => ({
        label: item.dictLabel,
        value: item.dictValue
      }))
    })
  })
  return toRefs(dictStore.value)
}