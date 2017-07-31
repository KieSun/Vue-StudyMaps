<template>
  <div class="wrapper">
    <pageBreak :type="type" :isLoad="isLoad" @changePage="changePage"></pageBreak>
    <transition :name="transition">
      <div class="content" :key="page">
        <ul>
          <item v-for="(item, index) in list" :key="index" :item="item"></item>
        </ul>
      </div>
    </transition>
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
      transition: 'right',
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
      this.list = await getRaywenderlichData(page)
      this.isLoad = false
    },
    openArticle(href) {
      window.open(href)
    },
    changePage(page) {
      page > this.page ? this.transition = 'left' : this.transition = 'right'
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

.left-enter, .right-leave-to {
  opacity: 0;
  transition:  .3s;
  transform: translate(50px, 0);
}

.left-leave-to, .right-enter {
  opacity: 0;
  transition:  .3s;
  transform: translate(-50px, 0);
}
</style>


