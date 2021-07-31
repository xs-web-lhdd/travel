<template>
    <div class="header" :style="opcityStyle" v-if="show">
        <div class="header__back iconfont" @click="handlebackclick">&#xe600;</div>
        <div class="header__content">景点展示</div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'Header',
  props: ['topshow'],
  data () {
    return {
      show: false,
      opcityStyle: {
        opacity: 0
      }
    }
  },
  methods: {
    handlescroll () {
      const top = document.documentElement.scrollTop
      // alert(top)
      if (top > 50 && top < 120) {
        this.opcityStyle.opacity = (top / 120)
        this.show = true && this.topshow
      } else {
        if (top > 120) {
          this.opcityStyle.opacity = 1
          this.show = true && this.topshow
        } else {
          this.show = false && this.topshow
        }
      }
    }
  },
  activated () {
    window.addEventListener('scroll', this.handlescroll)
  },
  deactivated () {
    window.removeEventListener('scroll', this.handlescroll)
  },
  setup () {
    const router = useRouter()
    const handlebackclick = () => {
      router.back()
    }
    return { handlebackclick }
  }
}
</script>

<style lang="scss" scoped>
.header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    height: .88rem;
    background-color: #25a4bb;
    &__back{
        height: .88rem;
        line-height: .88rem;
        position: absolute;
        top: 0;
        left: .2rem;
        color: #fff;
        font-size: .3rem;
    }
    &__content{
        flex: 1;
        text-align: center;
        line-height: .88rem;
        color: #fff;
    }
}
</style>
