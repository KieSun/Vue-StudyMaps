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
          value: 'zaoduke',
          label: '前端早读课'
        },
        {
          value: 'csstricks',
          label: 'CssTricks'
        },
        {
          value: 'raywenderlich',
          label: 'Raywenderlich'
        },
        {
          value: 'wxyyxc1992',
          label: '某熊的全栈之路'
        }
      ],
      selected: 'zaoduke'
    }
  },
  created() {
    this.selected = this.$store.state.type
  },
  methods: {
    selectChange() {
      this.$router.push(`/${this.selected}`)
      this.$store.state.type = this.selected
      this.$store.state.page = 1
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


