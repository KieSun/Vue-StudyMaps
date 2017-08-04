<template>
  <div class="progress" :style="{
    'width': percent+'%',
    'background-color': canSuccess? color : failedColor,
    'opacity': show ? 1 : 0
  }"></div>
</template>

<script>
export default {
  data () {
    return {
      percent: 0,
      show: false,
      canSuccess: true,
      duration: 5000,
      color: '#ffca2b',
      failedColor: '#ff0000'
    }
  },
  methods: {
    start () {
      this.show = true
      this.canSuccess = true
      if (this._timer) {
        clearInterval(this._timer)
        this.percent = 0
      }
      this._cut = 10000 / Math.floor(this.duration)
      this._timer = setInterval(() => {
        if (this.percent < 90) {
          this.increase(this._cut * Math.random())
        }
      }, 100)
      return this
    },
    increase (num) {
      this.percent = this.percent + Math.floor(num)
      return this
    },
    finish () {
      this.percent = 100
      this.hide()
      return this
    },
    hide () {
      clearInterval(this._timer)
      this._timer = null
      setTimeout(() => {
        this.show = false
        this.$nextTick(() => {
          setTimeout(() => {
            this.percent = 0
          }, 200)
        })
      }, 500)
      return this
    }
  }
}
</script>

<style scoped>
.progress {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 2px;
  width: 0%;
  transition: width 0.2s, opacity 0.4s;
  opacity: 1;
  background-color: #efc14e;
  z-index: 999999;
}
</style>
