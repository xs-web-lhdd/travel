<template>
    <div class="wrapper">
        <div class="title">热销推荐</div>
        <div class="item" v-for="item in recomendList" :key="item.imgUrl">
                <div class="item__left">
                    <img class="item__left__img" :src="item.imgUrl" >
                </div>
                <div class="item__right">
                    <div class="item__right__title">{{item.title}}</div>
                    <div class="item__right__desc">{{item.desc}}</div>
                    <router-link :to="`/citydetail/Citydetail/${item._id}`">
                        <div class="item__right__money">查看详情</div>
                    </router-link>
                </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Recomend',
  props: ['recomendList'],
  setup () {
  }
}
</script>

<style lang="scss" scoped>
a{
    color: #999;
    text-decoration: none;
}
.title{
    padding-left: .3rem;
    line-height: .8rem;
    height: .8rem;
    background-color: #f1f1f1;
}
.item{
    height: 2rem;
    display: flex;
    &__left{
        margin: .1rem;
        width: 2.5rem;
        height: 1.8rem;
        &__img{
            width: 100%;
            height: 100%;
            border-radius: .1rem;
        }
    }
    &__right{
        flex: 1;
        min-width: 0;
        margin-top: .1rem;
        margin-left: .2rem;
        border-bottom: .01rem solid #666;
        &__title{
            line-height: .5rem;
        }
        &__desc{
            padding: .1rem 0 0 0;
            font-size: .24rem;
            line-height: .4rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: flex;
        }
        &__money{
            margin-top: .2rem;
            font-size: .2rem;
            width: 1.3rem;
            line-height: .4rem;
            border-radius: .06rem;
            text-align: center;
            color: #000;
            background-color: #ffa50a;
        }
    }
}
</style>
