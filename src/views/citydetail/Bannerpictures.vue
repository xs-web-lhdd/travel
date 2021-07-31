<template>
    <div class="wrapper" @click="handleClosePictures">
        <div class="content">
            <swiper
              :pagination="swiperOption.pagination"
              :slides-per-view="1"
              :space-between="10"
            >
              <swiper-slide v-for="(item,index) in list" :key="index">
                <img class="content__images" :src="item.imgUrl">
              </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'
import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'
SwiperCore.use([Pagination])

const list = [
  { imgUrl: 'http://img1.qunarzz.com/sight/p0/1804/7f/7f80af3ddefeb12a3.img.jpg_r_800x800_7574b154.jpg' },
  { imgUrl: 'http://img1.qunarzz.com/sight/p0/1804/73/73912b99131910c0a3.img.jpg_r_800x800_33d6366d.jpg' },
  { imgUrl: 'http://img1.qunarzz.com/sight/p0/1804/63/639bb846dc8b3feaa3.img.jpg_r_800x800_96f6f2ee.jpg' },
  { imgUrl: 'http://img1.qunarzz.com/sight/p0/1804/32/3250983f64e052fba3.img.jpg_r_800x800_77fcfee8.jpg' },
  { imgUrl: 'http://img1.qunarzz.com/sight/p0/1804/c2/c27ab6f9e48d460a3.img.jpg_r_800x800_4c6a103d.jpg' }
]
export default {
  name: 'Bannerpictures',
  components: { Swiper, SwiperSlide },
  methods: {
    handleClosePictures () {
      this.$emit('close')
    }
  },
  setup () {
    const swiperOption = reactive({
      pagination: {
        clickable: true,
        type: 'fraction'
      },
      // 这两个属性是当发现自己DOM结构或者父亲DOM结构发送变化时这个轮播会自动刷新一次
      // 切记：在父元素外边要用v-if而不要用v-show因为，v-if会占dom位置，而v-show会直接将dom删除，所以v-if就会发送dom内部变化，而v-show不会发送dom内部变化
      observer: true,
      observeParents: true
    })
    return { swiperOption, list }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
    color: #fff;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000;
    overflow: hidden;
}
.content{
    z-index: 9;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 0;
    overflow: hidden;
    padding-bottom: 66.5%;
    background-color: #fff;
    &__images{
      width: 100%;
    }
}

</style>
