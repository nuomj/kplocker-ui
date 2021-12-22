<template>
  <el-form ref="fuzzyForm" :inline="true" :model="fuzzyForm" class="searchBar">
    <el-form-item v-for="item in fuzzyData" :key="item.name">
      <el-input v-if="item.type === 'input'" v-model.trim="fuzzyForm[item.name]" :clearable="!item.clearable" :placeholder="item.placeholder" :maxlength="item.maxlength ? item.maxlength : ''" />
      <el-select
        v-if="item.type === 'select' && !item.showVisible"
        v-model="fuzzyForm[item.name]"
        :style="{ width: item.width }"
        :popper-class="item.popperClass"
        :multiple="item.multiple"
        :collapse-tags="item.multiple"
        :filterable="!item.filterable"
        :placeholder="item.placeholder"
        :clearable="!item.clearable"
        @change="changeSelect(item, fuzzyForm[item.name])"
      >
        <el-option v-for="(opt, optIndex) in item.optArr" :key="optIndex" :value="opt.value" :label="opt.label">
          <template v-if="item.slotValue">
            <span>{{ opt.label }}</span>
            <span style="color: #999">（{{ opt[item.slotValue] }}）</span>
          </template>
        </el-option>
      </el-select>
      <el-date-picker
        v-if="item.type === 'date'"
        v-model="fuzzyForm[item.name]"
        :clearable="!item.clearable"
        :default-value="item.default ? item.default : ''"
        :default-time="item.defaultTime && item.typeDesc === 'datetime' ? item.defaultTime : '00:00:00'"
        :value-format="item.format ? item.format : 'yyyy-MM-dd'"
        :type="item.typeDesc ? item.typeDesc : 'date'"
        :placeholder="item.placeholder"
      />
      <el-date-picker
        v-if="item.type === 'daterange'"
        v-model="fuzzyForm[item.name]"
        :clearable="!item.clearable"
        unlink-panels
        type="daterange"
        range-separator="至"
        :start-placeholder="item.startPlaceholder"
        :end-placeholder="item.endPlaceholder"
        value-format="yyyy-MM-dd"
        :picker-options="item.pickerOptions"
      />
      <el-date-picker
        v-if="item.type === 'datetimerange'"
        v-model="fuzzyForm[item.name]"
        unlink-panels
        :clearable="!item.clearable"
        type="datetimerange"
        range-separator="至"
        :start-placeholder="item.startPlaceholder"
        :end-placeholder="item.endPlaceholder"
        :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
        :format="item.format || 'yyyy-MM-dd HH:mm:ss'"
      />
      <el-date-picker v-if="item.type === 'month'" v-model="fuzzyForm[item.name]" type="month" :placeholder="item.placeholder" value-format="yyyy-MM" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="search-btn" @click="search">查询</el-button>
    </el-form-item>
    <el-form-item v-if="addBtn">
      <el-button class="topbarRight" type="primary" plain @click="handleAdd(fuzzyForm)">添加</el-button>
    </el-form-item>
    <el-form-item v-if="reset">
      <el-button class="reset" @click="resetForm">清空条件</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'SearchBar',
  props: {
    reset: {
      type: Boolean,
      default: false,
    },
    searchArr: {
      type: Array,
      require: true,
      default() {
        return [];
      },
    },
    addBtn: {
      type: Boolean,
      default: false,
    },
    resetOrigin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fuzzyForm: {},
      fuzzyData: [],
      zoneList: [],
      oldOptions: [],
    };
  },
  watch: {
    searchArr: {
      immediate: true,
      handler(newVal) {
        const obj = {};
        newVal.forEach((item) => {
          let defaultValue = '';
          if (item.valueType === 'Array') {
            defaultValue = [];
          }
          if (item.value) {
            defaultValue = item.value;
            this.oldOptions[item.name] = item.value;
          }
          obj[item.name] = defaultValue;
        });
        this.fuzzyData = newVal;
        this.fuzzyForm = obj;
      },
      deep: true, // 深度监听
    },
  },
  methods: {
    search() {
      this.$emit('search', this.fuzzyForm);
    },
    resetForm() {
      this.$emit('clearSearch');
      if (this.resetOrigin) {
        this.searchArr.forEach((item) => {
          let defautValue = '';
          if (item.valueType === 'Array') {
            defautValue = [];
          }
          this.fuzzyForm[item.name] = item.value ? item.value : defautValue;
        });
      } else {
        Object.keys(this.fuzzyForm).forEach(() => {
          this.searchArr.forEach((item) => {
            if (item.valueType === 'Array') {
              this.fuzzyForm[item.name] = [];
            } else {
              this.fuzzyForm[item.name] = '';
            }
          });
        });
      }
    },
    changeSelect(obj, value) {
      const val = value;
      console.log(obj, val);
      if (obj.clearValues && obj.clearValues.length > 0) {
        const _clearValues = obj.clearValues;
        for (let i = 0; i < _clearValues.length; i++) {
          if (Object.prototype.toString.call(this.fuzzyForm[_clearValues[i]]) === '[object String]') {
            this.fuzzyForm[_clearValues[i]] = '';
          }
          if (Object.prototype.toString.call(this.fuzzyForm[_clearValues[i]]) === '[object Array]') {
            this.fuzzyForm[_clearValues[i]] = [];
          }
          if (Object.prototype.toString.call(this.fuzzyForm[_clearValues[i]]) === '[object Object]') {
            this.fuzzyForm[_clearValues[i]] = {};
          }
        }
      }
      // 单选
      if (!obj.multiple) {
        if (obj.change) {
          const _obj = {
            name: obj.name,
            value: val,
          };
          this.$emit('changeSelect', _obj);
        }
        if (obj.cascade) {
          this.$emit('changeCascade', { key: obj.name, value: val });
        }
        return;
      }
      // 多选
      let temporaryArr = val;
      const allValues = [];
      // 保留所有值
      for (const item of obj.optArr) {
        allValues.push(item.value);
      }
      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldOptions[obj.name].length === 0 ? [] : this.oldOptions[obj.name];
      // 若是全部选择
      if (val.includes('ALL_SELECT')) temporaryArr = allValues;
      // 取消全部选中 上次有 当前没有 表示取消全选
      if (oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) temporaryArr = [];
      // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('ALL_SELECT') && val.includes('ALL_SELECT')) {
        const index = val.indexOf('ALL_SELECT');
        val.splice(index, 1); // 排除全选选项
        temporaryArr = val;
      }
      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        if (val.length === allValues.length - 1) temporaryArr = ['ALL_SELECT'].concat(val);
      }
      // if (temporaryArr[0] === 'ALL_SELECT') {
      //   temporaryArr.splice(0, 1)
      // }
      // 储存当前最后的结果 作为下次的老数据
      this.oldOptions[obj.name] = temporaryArr;
      this.fuzzyForm[obj.name] = temporaryArr;
      if (obj.change) {
        const _obj = {
          name: obj.name,
          value: temporaryArr,
        };
        this.$emit('changeSelect', _obj);
      } else {
        this.$emit('changeSelect', temporaryArr);
      }
    },
    handleAdd() {
      this.$emit('handleAdd', this.fuzzyForm);
    },
    /**
     * 父组件更新数据
     * e [Object]
     * e.name [String]
     * e.optArr [Array]
     * e.value [String|Array]
     */
    changeData(e) {
      const fuzzyData = this.fuzzyData;
      let i = 0;
      while (i < fuzzyData.length) {
        if (fuzzyData[i].name === e.name) {
          fuzzyData[i].optArr = e.optArr;
          this.fuzzyForm[e.name] = e.value;
          break;
        }
        i++;
      }
      this.fuzzyData = fuzzyData;
    },
  },
};
</script>
<style scoped>
.right {
  float: right;
}
</style>
