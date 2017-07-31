<template>
  <li class="item">
    <h2 class="title" @click="openArticle(item.href)">{{item.title}}</h2>
    <div class="meta">
      <span class="author">{{item.author}}</span>
      <span class="date">{{item.date}}</span>
    </div>
  </li>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    openArticle(href) {
      window.open(href)
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>


