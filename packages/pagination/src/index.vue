<template>
  <div class="pagenation-container">
    <div class="page-box">
      <div v-show="pageStart" class="pre">
        <i class="el-icon-arrow-left" :class="pageStart == 0 ? 'disabled' : ''" @click="prevPage" />
        <!-- 上一页 -->
      </div>
      <el-select v-model="limit" class="page-select" @change="changeLimit">
        <el-option v-for="item in pageSizeList" :key="item" :label="item + '条/页'" :value="item" />
      </el-select>
      <div v-show="nextVisible" class="next">
        <i class="el-icon-arrow-right" :class="nextVisible ? '' : 'disabled'" @click="nextPage" />
        <!-- 下一页 -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    pageSizeList: {
      type: Array,
      default() {
        return [20, 50, 100];
      },
    },
    startRows: {
      type: Number,
      default: 0,
    },
    limitRows: {
      type: Number,
      default: 20,
    },
    nextVisible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      limit: 20,
      pageStart: 0,
    };
  },
  watch: {
    startRows: {
      immediate: true,
      handler(newVal) {
        this.pageStart = newVal;
      },
    },
    limitRows: {
      immediate: true,
      handler(newVal) {
        this.limitRows = newVal;
        this.limit = newVal;
      },
    },
    pageSizeList: {
      immediate: true,
      handler(newVal) {
        this.pageSizeList = newVal;
      },
      deep: true,
    },
  },
  methods: {
    prevPage() {
      if (this.pageStart) {
        if (this.pageStart >= this.limit) {
          this.pageStart -= parseInt(this.limit);
        } else {
          this.pageStart = 0;
        }
      } else {
        this.pageStart = 0;
      }
      this.$emit('pagination', {
        limitRows: this.limit,
        page: this.pageStart,
      });
    },
    nextPage() {
      this.pageStart += parseInt(this.limit);
      this.$emit('pagination', {
        limitRows: this.limit,
        page: this.pageStart,
      });
    },
    changeLimit(limit) {
      this.limit = limit;
      this.$emit('pagination', {
        limitRows: limit,
        page: this.pageStart,
      });
    },
  },
};
</script>
<style scoped>
.pagenation-container {
  margin-top: 40px;
  width: 100%;
  height: 40px;
  display: flex;
}

.page-box {
  width: 100%;
  text-align: right;
}
.pre,
.next {
  color: #606266;
  display: inline-block;
  width: 20px;
  height: 40px;
  line-height: 40px;
}

.el-icon-arrow-left:hover {
  color: #409eff;
}
.el-icon-arrow-right:hover {
  color: #409eff;
}
.pre {
  margin-right: 5px;
}
.next {
  margin-left: 5px;
}
</style>
