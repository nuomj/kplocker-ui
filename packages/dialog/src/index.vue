<template>
  <el-dialog :top="top" :lock-scroll="lockScroll" :title="title" :visible.sync="dialog" :close-on-click-modal="closeOnClickModal" append-to-body :class="DialogClass" :width="width" @opened="openDialog" @close="close">
    <slot name="content" />
    <slot name="footer" />
  </el-dialog>
</template>
<script>
export default {
  name: 'StDialog',
  props: {
    visibleSync: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    dialogClass: String,
    lockScroll: {
      type: Boolean,
      default: false
    },
    top: {
      type: String,
      default: '15vh'
    },
    width: {
      type: String
    }
  },
  data() {
    return {
      dialog: false,
      DialogClass: ''
    }
  },
  watch: {
    visibleSync: {
      immediate: true,
      handler(newVal) {
        this.dialog = newVal
      }
    },
    dialogClass: {
      immediate: true,
      handler(val) {
        this.DialogClass = val
      }
    }
  },
  methods: {
    close() {
      this.dialog = false
      this.$emit('close')
    },
    openDialog() {
      this.$emit('openDialog')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
