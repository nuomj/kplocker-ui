import StDialog from './dialog/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import { MessageBox } from 'element-ui'
import { Message } from 'element-ui'

const components = [
  StDialog
]
const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}
  
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
  
export default {
  ElementUI,
  MessageBox,
  Message,
  StDialog,
  install
}
export {
  ElementUI,
  MessageBox,
  Message,
  StDialog,
  install
}
