<template>
    <Cityheader :allCities="allCities"/>
    <List :hotCities="hotCities" :allCities="allCities" :letter="letter"/>
    <Scroll :allCities="allCities" @change="handleLetterChange"/>
</template>

<script>
import { ref } from 'vue'
import Cityheader from './Cityheader.vue'
import List from './List.vue'
import Scroll from './Scroll.vue'
import { get } from '../../untils/request'

export default {
  name: 'City',
  components: { Cityheader, List, Scroll },
  data () {
    return {
      letter: ''
    }
  },
  methods: {
    handleLetterChange (letter) {
      this.$data.letter = letter
    }
  },
  setup () {
    const hotCities = ref([])
    const allCities = ref([])
    const getCityMes = async () => {
      const result = await get('/api/city')
      const city = await get('/api/class-city')
      hotCities.value = result.data.hotCities
      allCities.value = city.data.cities
    }
    getCityMes()
    return { hotCities, allCities }
  }
}
</script>

<style lang="scss" scoped>

</style>
