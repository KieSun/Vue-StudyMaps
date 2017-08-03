<template>
  <div class="nav-wrapper">
    <el-select v-model="selected" @change="selectChange">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <i class="el-icon-plus" @click="addWebsite"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: 'raywenderlich',
          label: 'Raywenderlich'
        },
        {
          value: 'csstricks',
          label: 'CssTricks'
        }
      ],
      selected: 'raywenderlich'
    }
  },
  created() {
    let type = this.$route.path.match(/^\/[a-zA-Z]+/)
    if (type !== this.selected) {
      this.selected = type
    }
  },
  methods: {
    selectChange() {
      this.$router.push(`/${this.selected}`)
      this.$store.state.type = this.selected
      this.$store.state.pageIndex = 1
      window.localStorage.setItem('pageIndex', 1)
    },
    addWebsite() {
      window.open('https://github.com/KieSun/vue-studyMaps')
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-wrapper {
  height: 100%;
  width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-icon-plus {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>


