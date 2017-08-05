<template>
  <div class="wrapper">
    <progressBar ref="progress"></progressBar>
    <pageBreak class="pageBreak" 
      :type="type" 
      :isLoad="isLoad"
      :noMore="noMore" 
      @changePage="changePage">
    </pageBreak>
    <div class="content" :key="page" v-show="list.length" ref="content">
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
import ProgressBar from 'components/progress/progress'
export default {
  props: ['type'],
  data() {
    return {
      list: [],
      isLoad: false,
      page: 1,
      noMore: false
    }
  },
  mounted() {
    this.getData(this.$store.state.page)
  },
  methods: {
    async getData(page = 1) {
      if (this.isLoad) {
        return
      }
      this.isLoad = true
      this.$refs.progress.start()
      let data = await getRaywenderlichData(this.type, page)
      this.list = data.items
      if (!data.hasMore) {
        this.noMore = true
      } else {
        this.noMore = false
      }
      this.isLoad = false
      this.$refs.progress.finish()
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
    Item,
    ProgressBar
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding-top: 131px;
  .content {
    transition: all .5s cubic-bezier(.55,0,.1,1);
    position: absolute;
    overflow: hidden;
    width: 100%;
    margin: 30px 0;
  }
  .pageBreak {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    z-index: 100;
  }
}
</style>


