import StDialog from './dialog/index.js'
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
  StDialog,
  install
}
export {
  StDialog,
  install
}
