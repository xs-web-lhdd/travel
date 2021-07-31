<template>
    <div class="header">
        <div class="header__icon iconfont" @click="handlebackclick">&#xe600;</div>
        <div class="header__title">城市选择</div>
        <div class="header__input">
            <input @click="handleInputClick" class="header__input__content" v-model="keyword" placeholder="请输入城市或拼音" type="text">
        </div>
        <div class="header__search" v-if="list.length">
            <div class="header__search__item" @click="() => handleChangeCity(item)" v-for="(item,index) in list" :key="index">{{item}}</div>
            <div class="header__search__item" v-show="!list.length">没有找到匹配选项</div>
        </div>
    </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'City',
  props: ['allCities'],
  methods: {

  },
  setup (props, ctx) {
    const keyword = ref()

    const router = useRouter()
    const handlebackclick = () => {
      router.back()
    }
    const list = ref([])
    const handleInputClick = () => {
      list.value = []
    }

    watchEffect(() => {
      console.log(keyword.value)
      setTimeout(() => {
        if (keyword.value === undefined || keyword.value === '') {
          list.value = []
          return
        }
        for (const i in props.allCities) {
          props.allCities[i].forEach((value) => {
            if (value.spell.indexOf(keyword.value) > -1 || value.name.indexOf(keyword.value) > -1) {
              list.value.push(value.name)
            }
          })
        }
      }, 300)
    })

    const store = useStore()
    const handleChangeCity = (value) => {
      store.commit('changeCity', { value })
      list.value = []
      keyword.value = ''
      router.push({ name: 'Home' })
    }
    return { handlebackclick, keyword, list, handleInputClick, handleChangeCity }
  }
}
</script>

<style lang="scss" scoped>
.header{
    height: 1.6rem;
    line-height: 1.6rem;
    background: #00bcd4 !important;
    &__icon{
        position: absolute;
        font-size: .36rem;
        color: #fff;
        text-align: center;
        left: .2rem;
        top: 0;
        line-height: .88rem;
        height: .88rem;
    }
    &__title{
        line-height: .88rem;
        height: .88rem;
        font-size: .32rem;
        text-align: center;
        color: #fff;
        border: none;
    }
    &__input{
        width: 100%;
        height: .72rem;
        line-height: .72rem;
        &__content{
            box-sizing: border-box;
            padding: 0 .2rem ;
            display: block;
            margin: 0 auto;
            width: 98%;
            height: 90%;
            text-align: center;
            color: #666;
        }
    }
    &__search{
        // display: none;
        z-index: 9;
        line-height: .8rem;
        top: 1.6rem;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        background-color: #f1f1f1;
        overflow: scroll;
        &__item{
            width: 100%;
            height: .8rem;
            border-bottom: .01rem solid #999;
            background-color: #fff;
            padding-left: .2rem;
        }
    }
}
</style>
