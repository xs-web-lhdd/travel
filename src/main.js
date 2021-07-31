import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '../src/assets/styles/border.css'
import '../src/assets/styles/reset.css'
import '../src/assets/styles/iconfont.css'

createApp(App).use(store).use(router).mount('#app')
