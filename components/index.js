import Roll from './roll.vue'
import './roll.scss'

Roll.install = function (Vue) {
  Vue.component(Roll.name, Roll)
}
export {
  Roll
}