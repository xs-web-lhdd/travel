<template>
  <Homeheader />
  <div class="banner">
    <Swiper :swiperList="swiperList"/>
  </div>
  <Icon :iconList="iconList"/>
  <Recomend :recomendList="recomendList"/>
  <Weekend :weekendList="weekendList"/>
</template>

<script>
import { ref } from 'vue'
import Homeheader from '../components/Homeheader.vue'
import Swiper from '../components/Swiper.vue'
import Icon from '../components/Icon.vue'
import Recomend from '../components/Recomend.vue'
import Weekend from '../components/Weekend.vue'
import { get } from '../untils/request'

// 拿到热门推荐数据
const useRecommendEffect = () => {
  const swiperList = ref()
  const iconList = ref()
  const recomendList = ref([])
  const weekendList = ref([])
  const getmes = async () => {
    const result = await get('/api/home')
    if (result.error === 200) {
      swiperList.value = result.data.swiperlist
      iconList.value = result.data.iconlist
      recomendList.value = result.data.recommendlist
      weekendList.value = result.data.weekendlist
    }
  }
  return { swiperList, weekendList, iconList, recomendList, getmes }
}

export default {
  name: 'Home',
  components: { Homeheader, Swiper, Icon, Recomend, Weekend },
  setup () {
    const { swiperList, weekendList, iconList, recomendList, getmes } = useRecommendEffect()
    getmes()
    return { swiperList, weekendList, iconList, recomendList, getmes }
  }
}
</script>

<style lang="scss" scoped>
.banner{
  width: 100%;
  overflow: hidden;
  height: 0;
  padding-bottom: 31.25%;
}
</style>
