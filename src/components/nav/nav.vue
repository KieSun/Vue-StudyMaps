<template>
  <div class="nav-wrapper"></div>
</template>

<script>
import {getRaywenderlichData} from '../../api/api'
export default {
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      let data = await getRaywenderlichData(2)
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>


