<template>
    <div class="wrapper">
        <div class="title">周末去哪儿</div>
        <div class="item" v-for="item in weekendList" :key="item.imgUrl">
            <div class="item__left">
                <img class="item__left__img" :src="item.imgUrl" >
            </div>
            <div class="item__right">
                <div class="item__right__title">{{item.title}}</div>
                <div class="item__right__desc">{{item.desc}}</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Weekend',
  props: ['weekendList'],
  setup () {
  }
}
</script>

<style lang="scss" scoped>
.title{
    padding-left: .3rem;
    line-height: .8rem;
    height: .8rem;
    background-color: #f1f1f1;
}
.item{
    &__left{
        // height: rem;
        &__img{
            width: 100%;
        }
    }
    &__right{
        padding: .1rem;
        &__title{
            line-height: .5rem;
        }
        &__desc{
            line-height: .4rem;
            width: 5rem;
            font-size: .24rem;
            padding-bottom: .2rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

}
</style>
