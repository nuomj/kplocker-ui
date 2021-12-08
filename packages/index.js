import StDialog from './dialog/index.js'
import StSearchBar from './searchBar/index.js'

const components = [
  StDialog,
  StSearchBar
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
  StSearchBar,
  install
}
export {
  StDialog,
  StSearchBar,
  install
}
