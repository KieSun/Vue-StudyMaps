<template>
  <div class="wrapper">
    <div class="content">
      <ul>
        <li class="item" v-for="(item, index) in list" :key="index">
          <h2 class="title" @click="openArticle(item.href)">{{item.title}}</h2>
          <div class="meta">
            <span class="author">{{item.author}}</span>
            <span class="date">{{item.date}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getRaywenderlichData } from '../api/api'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.list = await getRaywenderlichData()
    },
    openArticle(href) {
      window.open(href)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 20px 0;
  height: 100%;
  .content {
    width: 800px;
    height: 100%;
    margin: 0 auto;
    background: #fff;
    .item {
      height: 85px;
      border-bottom: 1px solid #eee;
      font-size: 0;
      padding: 20px 40px;
      box-sizing: border-box;
      .title {
        font-size: 15px;
        color: #34495e;
        cursor: pointer;
      }
      .meta {
        margin-top: 5px;
        .author,
        .date {
          font-size: 12px;
          color: #828282;
        }
        .date {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>


