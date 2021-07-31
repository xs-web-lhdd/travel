<template>
    <Banner />
    <Citycontent :list="list"/>
</template>

<script>
import Banner from './Banner.vue'
import Citycontent from './Citycontent.vue'
const list = [
  {
    title: '成人票',
    two: [
      {
        title: '成人三馆联票',
        two: [
          { title: '111' },
          { title: '111' },
          { title: '111' },
          { title: '111' }
        ]
      },
      { title: '成人三馆联票' }
    ]
  },
  { title: '儿童票' },
  { title: '半人半妖票' }
]
export default {
  name: 'Citydetail',
  components: {
    Banner,
    Citycontent
  },
  setup () {
    return { list }
  }
}
</script>

<style lang="scss" scoped>

</style>
