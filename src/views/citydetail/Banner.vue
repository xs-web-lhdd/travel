<template>
    <keep-alive>
      <Header :topshow="topshow"/>
    </keep-alive>
    <div class="banner">
        <div class="banner__back iconfont" @click="handlebackclick">&#xe600;</div>
        <img class="banner__img" @click="handleShowPictures" src="http://img1.qunarzz.com/sight/p0/1804/7f/7f80af3ddefeb12a3.img.jpg_600x330_44a766f3.jpg" />
        <div class="banner__info">郑州方特世界（AAAA景区）</div>
        <div class="banner__images iconfont">&#xe642;
            <span>43</span>
        </div>
    </div>
    <keep-alive>
        <Bannerpictures v-if="show" @close="close"/>
    </keep-alive>
</template>

<script>
import { useRouter } from 'vue-router'
import Bannerpictures from './Bannerpictures.vue'
import Header from './Header.vue'
export default {
  name: 'Banner',
  components: { Bannerpictures, Header },
  data () {
    return {
      show: false,
      topshow: true
    }
  },
  methods: {
    // 关闭图片展示
    close () {
      this.show = false
      this.topshow = true
    },
    handleShowPictures () {
      this.show = true
      this.topshow = false
    }
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
.banner{
    position: relative;
    overflow: hidden;
    height: 0;
    padding-bottom: 55%;
    background-color: red;
    &__img{
        width: 100%;
    }
    &__back{
        position: absolute;
        top: .2rem;
        left: .2rem;
        width: .7rem;
        height: .7rem;
        line-height: .7rem;
        background-color: rgba(0, 0, 0, .5);
        color: #fff;
        text-align: center;
        border-radius: 50%;
    }
    &__info{
        position: absolute;
        top: 3.6rem;
        left: .2rem;
        color: #fff;
        font-size: .36rem;
    }
    &__images{
       position: absolute;
       top: 3.55rem;
       right: .3rem;
       color: #fff;
       width: 1.2rem;
       height: .4rem;
       line-height: .4rem;
       text-align: center;
       background: rgba(0, 0, 0, .5);
       border-radius: .15rem;
    }
}
</style>
