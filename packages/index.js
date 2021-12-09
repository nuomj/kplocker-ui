import StDialog from './dialog/index.js'
import SearchBar from './searchBar/index.js'
import Pagination from './pagination/index.js'
import { utils } from '../src/utils/index.js'

const components = [
  StDialog,
  Pagination,
  SearchBar
]
const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  StDialog,
  SearchBar,
  Pagination,
  utils,
  install
}
export {
  StDialog,
  SearchBar,
  Pagination,
  utils,
  install
}
