<template>
  <div class="header">
    <div class="header__icon iconfont">&#xe600;</div>
    <div class="header__input">
        <div class="header__input__icon iconfont">&#xe601;</div>
        <input class="header__input__content" placeholder="请输入城市、景点" type="text">
    </div>
    <router-link to='/city/City'>
        <div class="header__right">{{store.state.city}}
            <span class="iconfont">&#xe614;</span>
        </div>
    </router-link>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'Home',
  setup () {
    const store = useStore()
    return { store }
  }
}
</script>

<style lang="scss" scoped>
.header{
    display: flex;
    height: .86rem;
    background-color: #00bcd4;
    &__icon{
        font-size: .3rem;
        color: #fff;
        float: left;
        width: .64rem;
        line-height: .86rem;
        text-align: center;
    }
    &__input{
        flex: 1;
        margin-top: .12rem;
        border-radius: .1rem;
        display: flex;
        height: .64rem;
        background-color: #fff;
        &__icon{
            color: #666;
            padding-left: .2rem;
            line-height: .64rem;
        }
        &__content{
            height: .64rem;
            width: 100%;
            padding-left: .1rem;
            border: none;
            ::placeholder{
                color: #fff;
            }
        }
    }
    &__right{
        color: #fff;
        float: right;
        min-width: 1.04rem;
        padding: 0 .1rem;
        line-height: .86rem;
        text-align: center;
    }
}
</style>
