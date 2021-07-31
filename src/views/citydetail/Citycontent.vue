<template>
    <div class="content" v-for="(item,index) in list" :key="index">
        <span class="iconfont">&#xe600;</span>
        <span class="content__item">{{item.title}}</span>
        <div v-if="item.two">
            <Citycontent :list="item.two"/>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Citycontent',
  props: ['list']
}
</script>

<style lang="scss" scoped>
.content{
    display: inline-block;
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    padding-left: .2rem;
}
</style>
