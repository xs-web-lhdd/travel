<template>
  <ul class="list">
      <li
        class="list__item"
        @click="handleLetterClick"
        v-for="item of letter"
        :key="item"
        :ref="item"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handelTouchEnd"
      >{{item}}</li>
  </ul>
</template>

<script>
export default {
  name: 'Scroll',
  props: ['allCities'],
  data () {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    }
  },
  computed: {
    letter () {
      const letters = []
      for (const i in this.allCities) {
        letters.push(i)
      }
      return letters
    }
  },
  updated () {
    this.startY = this.$refs.A.offsetTop
  },
  methods: {
    handleLetterClick (e) {
      this.$emit('change', e.target.innerText)
    },
    handleTouchStart () {
      this.$data.touchStatus = true
    },
    handleTouchMove (e) {
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY - 156
          const index = Math.floor((touchY - this.startY) / 20)
          if (index >= 0 && index <= this.letter.length) {
            this.$emit('change', this.letter[index])
            console.log(this.letter[index])
          }
        }, 16)
      }
    },
    handleTouchEnd () {
      this.touchStatus = false
    }
  }
}
</script>

<style lang="scss" scoped>
.list{
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 1.6rem;
    right: 0;
    bottom: 0;
    width: .4rem;
    &__item{
        text-align: center;
        line-height: .4rem;
        color: #00bcd4;
    }
}
</style>
