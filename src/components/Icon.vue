<template>
  <div class="wrapper">
      <div class="wrapper__icon" v-for="item in iconList" :key="item.imgUrl">
          <img class="wrapper__icon__img" :src="item.imgUrl" :title="item.text">
          <div class="wrapper__icon__desc">{{item.text}}</div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Icon',
  props: ['iconList'],
  setup () {
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
    width: 100%;
    height: 0;
    padding-bottom: 34%;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    &__icon{
        width: 20%;
        &__img{
            display: block;
            margin: 0 auto;
            width: 50%;
        }
        &__desc{
          margin: .06rem 0 .16rem 0;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
    }
}
</style>
