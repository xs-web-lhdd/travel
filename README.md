# travel项目详细知识点总结：

##### 1、iconfont样式的配置以及全局引入：

配置：

首先需要在iconfont官网中创建一个新项目然后将其下载到本地，接着将一个命名为iconfont.css的文件复制到项目中styles的文件夹中，保持：

```css
@font-face {
  font-family: 'iconfont';  /* Project id 2620307 */
  src: url('//at.alicdn.com/t/font_2620307_bmmlf41zr2o.woff2?t=1627456922896') format('woff2'),
       url('//at.alicdn.com/t/font_2620307_bmmlf41zr2o.woff?t=1627456922896') format('woff'),
       url('//at.alicdn.com/t/font_2620307_bmmlf41zr2o.ttf?t=1627456922896') format('truetype');
}
  
  .iconfont {
    font-family: "iconfont" !important;
    font-size: .16rem;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
```

这两段代码即可

全局引入：

在main.js中添加路径即可

```javascript
import '../src/assets/styles/iconfont.css'
```

##### 2、路由的配置以及修改的方法：

在初始化项目的时候选择哈希路由，如果没有选择正确就去router文件夹下面index.js文件中进行修改，修改为：

```javascript
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
```

即可，记得修改前先把路由引用过来

```javascript
import { createWebHashHistory } from 'vue-router'
```

##### 3、异步路由与异步组件的使用：

在打包后dist目录中会有一个index.js，如果太大可能在加载首页的时候速度过慢用户体验就不太好，所以可以使用异步路由以及异步组件的方式进行按需加载

动态路由：

在vue项目初始化时router文件夹下面index.js会有一个about页面的路由，可以先注释着后边从里面复制代码，动态路由就是添加：

```js
component: () => import(/* webpackChunkName: "city" */ '../views/city/City')
```

这一行代码，括号前面的是webpack打包时的名字，后面的是相对路径

动态组件：

异步组件跟异步路由目的差不多，无非名称不一样罢了，在引入组件的时候（也就是components里面）在后面加上上面那行代码即可

##### 4、axios的引入以及封装：

引入：

```bash
npm install axios --save
```

在package.json中的依赖中有：

```json
    "axios": "^0.21.1"
```

这样一条记录就代表着引入成功了（只是其中的一种方法）

在这里顺便说一下开发依赖和依赖，开发依赖就是在做实际开发中需要的东西，而依赖是上线是也需要的东西，显然像scss这种只会在开发时使用，在实际上线时webpack会将其打包成css文件，因此在安包时一定要分清开发依赖和依赖

封装：

在src文件夹中创建一个untils的文件夹，里面创建一个request.js的文件，里面内容：

```javascript
import axios from 'axios'

// 创建一个axios的实例：
const instance = axios.create({
  // baseURl会自动将请求地址拼到url前面
  // baseURL: 'https://www.fastmock.site/mock/c5d0565bfa454a9e486b470cf5fc7aeb/login',
  baseURL: 'https://www.fastmock.site/mock/6f57c3e22d86da0528db6d88e2c1fa34/api',
  withCredentials: true,
  timeout: 10000
})

// 封装get请求
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then((response) => {
      resolve(response.data)
    }, (err) => {
      reject(err)
    })
  })
}

// 封装post请求
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      resolve(response.data)
    }, (err) => {
      reject(err)
    })
  })
}

// 封装patch请求
export const patch = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.patch(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      resolve(response.data)
    }, (err) => {
      reject(err)
    })
  })
}

```

这个封装还是很好用的

##### 5、axios与async await方法结合使用发送请求：

```javascript
  const getmes = async () => {
    const result = await get('/api/home')
    if (result.error === 200) {
      swiperList.value = result.data.swiperlist
      iconList.value = result.data.iconlist
      recomendList.value = result.data.recommendlist
      weekendList.value = result.data.weekendlist
    }
  }
```

​	将发送请求的方法（get、post等）写到一个async函数中，记得要加async，同样获取发送请求结果时也要加上await，两者缺谁都得不到请求，然后在改变数组值的时候记得用状态码判断一下，至于正确时的error是多少需要跟后端协商一下，顺便插一嘴，如果vue3那么在请求时想将一个返回请求的整个数组值赋给一个响应数组那么推荐使用ref([])，如果里面有多个值就推荐使用reactive，别问为什么，这都是花时间总结出来的，还有就是ref对基本数据类型比较合适，在setup中可用XX.value对其值进行操作，但在模板中千万别加.value因为，程序会自己默认加个.value，所以导出时什么名字使用时也什么名字就行了。

​	还有一个知识点是如果一个请求能完成的尽量不要用两个请求，毕竟一次请求的代价不容易，可以用父组件请求，然后将请求的数据拆分出来单独传给每一个子组件，见home组件完整代码：

```vue
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

```

##### 6、轮播图插件的使用：

swiper官网位置：

[swiper]: https://www.swiper.com.cn/

安包：

```bash
npm i swiper --save
```

详细配置：

```vue
<template>
    <swiper
      :autoplay="swiperOption.autoplay"
      :loop="swiperOption.loop"
      :speed="swiperOption.speed"
      :pagination="swiperOption.pagination"
      :slides-per-view="1"
      :space-between="10"
    >
      <swiper-slide v-for="(item,index) in swiperList" :key="index">
        <img :src="item.imgUrl" class="banner__img" title="双十一购物狂欢">
      </swiper-slide>
    </swiper>
</template>

<script>
import { reactive } from 'vue'
import SwiperCore, { Autoplay, Pagination } from 'swiper'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'
SwiperCore.use([Autoplay, Pagination])

export default {
  name: 'Search',
  props: ['swiperList'],
  components: { Swiper, SwiperSlide },
  setup () {
    const swiperOption = reactive({
      autoplay: {
        delay: 2000,
        disableOnIneraction: false
      },
      loop: true,
      speed: 1000,
      pagination: {
        clickable: true
      }
    })
    return { swiperOption }
  }
}
</script>

<style lang="scss" scoped>
img{
    width: 100%;
    border-radius: .1rem;
}
</style>

```

因为防止把整个swiper引入导致项目太大，而一些用法不需要这种情况发生，可以按需引入，比如这个里面需要分页器、自动播放，那么就按需引入即可，还有就是引入的同时要把样式引入否则是不会有效果的，也记得要在选项中进行配置，例如可以将分页器的样式进行修改，如:

```bash
      pagination: {
        clickable: true,
        type: 'fraction'
      }
```

就是将分页器由圆点改成xx/xx这种样式

##### 7、动态路由的使用：

动态路由在像商家详情这种项目中用的比较多，例如根据不同商家跳转到不同商家页面这种需求就用的比较多。

第一步：在路由里定义动态路由：

```js
  {
    path: '/citydetail/Citydetail/:id',
    name: 'Citydetail',
    component: () => import(/* webpackChunkName: "citydetail" */ '../views/citydetail/Citydetail')
  }
```

记得在后后面加一个:id，这点要注意

第二部：跳转的时候带上id跳转

如果直接跳转到/citydetail/Citydetail这个页面那么将是空白的，正确写法（用router-link）：

```html
<router-link :to="`/citydetail/Citydetail/${item._id}`">
             <div class="item__right__money">查看详情</div>
</router-link>
```

因为是动态跳转所以router-link前面一定要写成:to

##### 8、子组件像父组件传值的应用：

该方法是基于vue2实现的，是当子组件要向父组件传值的时候触发一个

```js
this.$emit('close')
```

的请求，当然可以传参，不过这里没有传而已，然后父组件监听这个事件：

```js
<Bannerpictures v-if="show" @close="close"/>
```

当这个事件发生时，父组件在自己的方法里调用函数，进行修改值

##### 9、swiper中特殊属性的应用（以及v-show和v-if）：

在写这个项目点击图片显示图片手动轮播的时候点击总是出现问题，原因是轮播图里内部大小改变了而程序没有进行重新计算导致的，解决这个问题需要在轮播选项中插入：

```javascript
      observer: true,
      observeParents: true
```

这两个属性是当自生dom结构或者父亲dom结构改变时就会从新刷新一次，有了这两个属性问题迎刃而解。

但还有一个问题：

```html
     <Bannerpictures v-if="show" @close="close"/>
```

Bannerpictures是定义的组件名称，这里通过v-if判断这个组件是否展示，但切记如果用v-show上面的那个问题将无法解决，原因很简单，v-if显示隐藏是将dom元素整个添加或删除，而v-show隐藏则是为该元素添加css--display:none，dom元素还在。因此v-show不会改变dom结构而v-if会改变dom结构，因此这里只能用v-if而不能用v-show

##### 10、keep-alive妙用以及渐隐渐显效果的制作：

keep-alive会缓存组件，用法就是在组件外边包裹上keep-alive即可，这个对性能优化起到了非常好的作用。

keep-alive在vue.js中的官方文档： https://v3.cn.vuejs.org/api/built-in-components.html#transition-group

一网友对keep-alive以及activated和deactivated方法的讲解：https://www.jianshu.com/p/0272c0fe9392

activated和deactivated在vue.js中的官方解释：https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#activated （注意：只有他们两个与keep-alive结合时才会生效）

渐隐渐显效果与activated的结合：

```javascript
  activated () {
    window.addEventListener('scroll', this.handlescroll)
  },
  deactivated () {
    window.removeEventListener('scroll', this.handlescroll)
  }
```

就是给全局window绑定事件，vue2中这种操作的确很方便，在vue3中我还不太清楚怎么操作，当然在不用事件的时候一定要记得销毁事件，就由deactivated执行，这样就防止在其他页面时滚动会执行此操作

用动态样式:style以及opacity实现渐隐渐显效果：

```javascript
  data () {
    return {
      show: false,
      opcityStyle: {
        opacity: 0
      }
    }
  },
  methods: {
    handlescroll () {
      const top = document.documentElement.scrollTop
      // alert(top)
      if (top > 50 && top < 120) {
        this.opcityStyle.opacity = (top / 120)
        this.show = true && this.topshow
      } else {
        if (top > 120) {
          this.opcityStyle.opacity = 1
          this.show = true && this.topshow
        } else {
          this.show = false && this.topshow
        }
      }
    }
  },
```

通过计算出卷进去的高度然后用高度出一定数值算出透明度即可。

整个代码：

```vue
<template>
    <div class="header" :style="opcityStyle" v-if="show">
        <div class="header__back iconfont" @click="handlebackclick">&#xe600;</div>
        <div class="header__content">景点展示</div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'Header',
  props: ['topshow'],
  data () {
    return {
      show: false,
      opcityStyle: {
        opacity: 0
      }
    }
  },
  methods: {
    handlescroll () {
      const top = document.documentElement.scrollTop
      // alert(top)
      if (top > 50 && top < 120) {
        this.opcityStyle.opacity = (top / 120)
        this.show = true && this.topshow
      } else {
        if (top > 120) {
          this.opcityStyle.opacity = 1
          this.show = true && this.topshow
        } else {
          this.show = false && this.topshow
        }
      }
    }
  },
  activated () {
    window.addEventListener('scroll', this.handlescroll)
  },
  deactivated () {
    window.removeEventListener('scroll', this.handlescroll)
  },
  setup () {
    const router = useRouter()
    const handlebackclick = () => {
      router.back()
    }
    return { handlebackclick }
  }
}
</script>

<style lang="scss" scoped>
.header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    height: .88rem;
    background-color: #25a4bb;
    &__back{
        height: .88rem;
        line-height: .88rem;
        position: absolute;
        top: 0;
        left: .2rem;
        color: #fff;
        font-size: .3rem;
    }
    &__content{
        flex: 1;
        text-align: center;
        line-height: .88rem;
        color: #fff;
    }
}
</style>

```

##### 11、父组件传的值如何在setup函数中拿到：

setup函数接收两个参数，第一个props里面就含有父组件传过来的值，可以通过props得到父组件传过来的值然后进行修改赋值操作等

setup函数参数在vue.js中的具体用法：https://v3.cn.vuejs.org/guide/composition-api-setup.html#%E5%8F%82%E6%95%B0，很详细，要认真阅读

一网友的理解：https://blog.csdn.net/csl125/article/details/116455690

##### 12、搜索功能的实现：

这个搜索可以有两种方法实现，一种是前端一次性请求获取所有相关数据，然后根据indexOf进行筛选，另一种是根据用户点击搜索的时候发送请求，将含有的搜索信息发送给后端，让后端查询数据库，然后返回给前端，这两种方法各有优略点，怎么使用看前后端如何商量了，无非第一种响应性比较好，只要搜索框中的内容在请求后的数组中存在就会显示出来，另一种比较省流量，只有用户需要的时候才进行发送请求，不会一到搜索页面就直接发送请求获取所有数据（不管用户有没有搜索），下面是第一种的完整代码：

```vue
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

```

核心代码就是watchEffct里面监听的内容

##### 13、better-scroll插件的应用：

个人觉得挺好用的，让滑动有一些简单的动画效果，建议有空仔细研究研究，不仅可以上下也可以左右（轮播图也可用于此）

官网：https://better-scroll.github.io/docs/en-US/plugins/#why-need-plugins

github地址：https://github.com/ustbhuangyi/better-scroll

demo网址： https://better-scroll.github.io/examples/#/

##### 14、在使用better-scroll时遇到的一些bug，以及解决方案：

在渲染大量数据时，尽管better-scroll使用正确但也无法滚动原因是数据量过大导致页面的高度计算出错导致的，我个人解决这个方法是用异步来解决的，添加一个setTimeout函数，然后进行解决，当然为了不影响用户体验我尽可能缩短setTimeout函数的时间，在这里我设置的时间是400秒，时间再断可能这种方法就不太行了，解决问题的核心代码：

```js
  mounted () {
    // 数据过大需要异步
    setTimeout(() => {
      this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.wrapper, {
          click: true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad
        })
      })
    }, 400)
  }
```

上边的bug还有一个解决方案就是将生命周期函数改成updated，也可以正常滚动，网友连接：https://blog.csdn.net/weixin_42451032/article/details/115188641

在这里还有一个细节点就是在vue2中操作dom，那么需要给dom添加一个ref的属性，获取这个标记过的dom就可以用vue2中options API的方式获取，以这个为例就是this.$refs.wrapper即可获取到

官方文档：https://cn.vuejs.org/v2/api/#ref

##### 15、点击不同英文字母跳转到不同的字母前边：

在scroll组件中点击不同字母就会执行handleLetterClick这个函数，然后通过e.target.innerText可以得到点击的字母的值，然后将这个值传递给父组件City，父组件可以将这个值传递给List组件，然后List组件监听传过来的这个值，如果不是空那么就执行this.scroll.scrollToElement函数跳到这个字母对应的位置，scroll都是better-scroll的方法

一网友理解：https://blog.csdn.net/liangklfang/article/details/52804915

##### 16、还有一个细节点就是拖动右边滚轮时左边数据也会发生变化，结合@touchstart @touchmove @touchend这三个事件得以实现：

鉴于该过程口述过于麻烦可以直接看代码：

```vue
<template>
  <ul class="list">
      <li
        class="list__item"
        @click="handleLetterClick"
        v-for="item of letter"
        :key="item"
        :ref="item"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handelTouchEnd"
      >{{item}}</li>
  </ul>
</template>

<script>
export default {
  name: 'Scroll',
  props: ['allCities'],
  data () {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    }
  },
  computed: {
    letter () {
      const letters = []
      for (const i in this.allCities) {
        letters.push(i)
      }
      return letters
    }
  },
  updated () {
    this.startY = this.$refs.A.offsetTop
  },
  methods: {
    handleLetterClick (e) {
      this.$emit('change', e.target.innerText)
    },
    handleTouchStart () {
      this.$data.touchStatus = true
    },
    handleTouchMove (e) {
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY - 156
          const index = Math.floor((touchY - this.startY) / 20)
          if (index >= 0 && index <= this.letter.length) {
            this.$emit('change', this.letter[index])
            console.log(this.letter[index])
          }
        }, 16)
      }
    },
    handleTouchEnd () {
      this.touchStatus = false
    }
  }
}
</script>

<style lang="scss" scoped>
.list{
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 1.6rem;
    right: 0;
    bottom: 0;
    width: .4rem;
    &__item{
        text-align: center;
        line-height: .4rem;
        color: #00bcd4;
    }
}
</style>

```

其中有一个节流的操作比较优秀，大致思路就是先定义一个定时器为null，然后执行判断是否有定时器，如果有定时器就将定时器清空，如果没有定时器就将执行移动这个操作放入定时器中，中间间隔16毫秒，也就意味着如果在16毫秒之内还在执行操作，那么就会等不到执行操作就会把上一次定时器清掉，那么操作就不会执行，这样就起到一个节流的作用

```javascript
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY - 156
          const index = Math.floor((touchY - this.startY) / 20)
          if (index >= 0 && index <= this.letter.length) {
            this.$emit('change', this.letter[index])
            console.log(this.letter[index])
          }
        }, 16)
      }
```

这就是核心代码

##### 16、解决不同页面之间的滚动导致其他页面滚动的解决方案：

在vue-router官网中有一个滚动行为，网址：https://next.router.vuejs.org/guide/advanced/scroll-behavior.html

在路由中配置一下即可解决这个问题：

配置内容：

```javascript
  scrollBehavior (to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  }
```

这样就可以解决不同页面滚动导致的问题了

##### 17、递归组件的应用：

递归组件经常用于标题之间的嵌套，如一级标题下面有二级标题等等这种情况，但一定记得要加v-if这种判断，要不然会因为一直递归而导致栈溢出

详情代码：

```vue
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

```

父组件：

```vue
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

```

递归组件亮点就是自己调用自己
