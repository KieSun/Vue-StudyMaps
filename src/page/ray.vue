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
  props: ['type'],
  data() {
    return {
      list: [],
      isLoad: false,
      page: 1
    }
  },
  created() {
    this.getData(this.$store.state.pageIndex)
  },
  methods: {
    async getData(page = 1) {
      if (this.isLoad) {
        return
      }
      this.isLoad = true
      this.list = await getRaywenderlichData(this.type, page)
      this.isLoad = false
    },
    openArticle(href) {
      window.open(href)
    },
    changePage(page) {
      this.page = page
      this.getData(page)
    },
    routeChange() {
      if (this.$route.params.page) {
        this.$store.state.pageIndex = parseInt(this.$route.params.page)
      } else {
        this.$store.state.pageIndex = 1
      }
      let type = this.$route.path.match(/^\/[a-zA-Z]+/)
      if (type) {
        this.$store.state.type = type[0].slice(1, -1)
        console.log(type[0].slice(1, -1))
      }
      this.getData(this.$store.state.pageIndex)
    }
  },
  components: {
    PageBreak,
    Item
  },
  watch: {
    '$route': 'routeChange'
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


