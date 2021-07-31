<template>
<div class="wrapper" ref="wrapper">
<div class="content">
    <div class="area">
        <div class="area__title">当前城市</div>
        <ul class="area__btn">
            <li class="area__btn__one">{{store.state.city}}</li>
        </ul>
    </div>
    <div class="area">
        <div class="area__title">热门城市</div>
        <div class="area__btn">
            <div class="area__btn__one" @click="() => handleChangeCity(item.name)" v-for="item in hotCities" :key="item.id">{{item.name}}</div>
        </div>
    </div>
    <div class="area" v-for="(item,key) of allCities" :key="item.name">
        <div class="area__title" :ref="key">{{key}}</div>
        <ul class="area__gar">
            <li class="area__gar__one" @click="() => handleChangeCity(inneritem.name)" v-for="(inneritem,innerindex) in item" :key="innerindex">{{inneritem.name}}</li>
        </ul>
    </div>
</div>
</div>
</template>

<script>
import Bscroll from 'better-scroll'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'List',
  props: ['allCities', 'hotCities', 'letter'],
  watch: {
    letter () {
      if (this.letter) {
        const element = this.$refs[this.letter]
        this.scroll.scrollToElement(element)
      }
    }
  },
  updated () {
    // 数据过大需要异步
    setTimeout(() => {
      this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.wrapper, {
          click: true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad
        })
      })
    }, 400)
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const handleChangeCity = (value) => {
      store.commit('changeCity', { value })
      router.back()
    }
    return { store, handleChangeCity }
  }

}
</script>

<style lang="scss" scoped>
.wrapper{
    position: absolute;
    overflow: hidden;
    top: 1.6rem;
    right: 0;
    left: 0;
    bottom: 0rem;
}
.area{
    background-color: #f1f1f1;
    color: #212121;
    font-size: .2rem;
    &__title{
        padding: .1rem;
        padding-bottom: .1rem;
        border-bottom: #ccc solid .01rem;
    }
    &__btn{
        display: flex;
        flex-wrap: wrap;
        padding: .1rem 0;
        background-color: #fff;
        &__one{
            margin: .1rem .1rem ;
            width: 30%;
            height: .6rem;
            text-align: center;
            line-height: .6rem;
            font-size: .3rem;
            border: .02rem solid #999;
            border-radius: .1rem;
        }
    }
    &__gar{
        width: 100%;
        background-color: #fff;
        &__one{
            padding-left: .1rem;
            height: .8rem;
            line-height: .8rem;
            border-bottom: .01rem solid #999;
            font-size: .3rem;
            color: #999;
        }
    }
}
</style>
