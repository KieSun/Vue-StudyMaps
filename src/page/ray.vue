<template>
  <div class="wrapper">
    <pageBreak :type="type" :isLoad="isLoad" @changePage="changePage"></pageBreak>
      <div class="content" :key="page">
        <ul>
          <item v-for="(item, index) in list" :key="index" :item="item"></item>
        </ul>
      </div>
  </div>
</template>

<script>
import { getRaywenderlichData } from '../api/api'
import PageBreak from 'components/pageBreak/pageBreak'
import Item from 'components/item/item'
export default {
  data() {
    return {
      list: [],
      type: 'raywenderlich',
      isLoad: false,
      page: 1
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData(page = 1) {
      if (this.isLoad) {
        return
      }
      this.isLoad = true
      console.log(page)
      this.list = await getRaywenderlichData(page)
      this.isLoad = false
    },
    openArticle(href) {
      window.open(href)
    },
    changePage(page) {
      this.page = page
      this.getData(page)
    }
  },
  components: {
    PageBreak,
    Item
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin-bottom: 20px;
  height: 100%;
  .content {
    width: 800px;
    height: 100%;
    margin: 20px auto 0;
    background: #fff;
  }
}

</style>


