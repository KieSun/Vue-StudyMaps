<template>
  <div class="page-wrapper">
    <div class="button-group">
      <el-button class="left" :disabled="pageIndex===1" :class="{disable: disabled}" type="primary" icon="arrow-left" @click="reducePage">上一页</el-button>
      <span class="page">{{pageIndex}}</span>
      <el-button class="right" type="primary" @click="addPage">下一页
        <i class="el-icon-arrow-right el-icon--right"></i>
      </el-button>
    </div>
  
  </div>
</template>

<script>
export default {
  props: ['type', 'isLoad'],
  data() {
    return {
      pageIndex: 1,
      disabled: true
    }
  },
  methods: {
    reducePage() {
      if (this.isLoad) {
        return
      }
      if (this.pageIndex === 1) {
        return
      }
      this.pageIndex -= 1
      this.routerPush()
    },
    addPage() {
      if (this.isLoad) {
        return
      }
      this.pageIndex += 1
      this.routerPush()
    },
    routerPush() {
      this.$router.push(`/${this.type}/${this.pageIndex}`)
      this.$emit('changePage', this.pageIndex)
    }
  },
  watch: {
    pageIndex() {
      if (this.pageIndex === 1) {
        this.disabled = true
      } else {
        this.disabled = false
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to, from)
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
  background: #fff;
  font-size: 0;
  .button-group {
    .left {
      margin-right: 20px;
      color: #fff;
    }
    .right {
      margin-left: 20px;
      color: #fff;
    }
    .page {
      vertical-align: middle;
      font-size: 15px;
      line-height: 36px;
    }
    .disable {
      color: #ccc;
      &.arrow-left {
        color: #ccc;
      }
    }
  }
}
</style>

