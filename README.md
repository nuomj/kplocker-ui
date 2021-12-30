# kplocker-ui

基于element-ui（2.15.6）、vue（2.6.11）封装常用业务组件（需单独安装element-ui依赖并引入）、业务常用utils工具包

## Install
```
npm install kplocker-ui -S
```

## Quick Start
```
// main.js中全局引入
import Vue from 'vue'
import kplockerUI from 'kplocker-ui'

Vue.use(kplockerUI)

// or
import { StDialog } from 'kplocker-ui'
Vue.use(StDialog)
```

## LICENSE
```
MIT
```

v0.1.4-更新
SearchBar组件扩展，在查询前增加customize插槽，用于自定义查询条件

v0.1.3-更新
SearchBar组件内元素增加width属性

v0.1.2-更新
优化SearchBar增加slot:footer插槽

v0.1.1-更新
优化SearchBar组件赋默认值时反选二次点击问题

v0.1.0-更新

去掉stDialog组件

v0.0.9-更新

1、增加utils工具包，处理常见业务，如validateMoney校验金额、getDate返回指定日期
2、增加查询表单组searchBar组件、分页组件pagination
