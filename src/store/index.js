import { createStore } from 'vuex'

// 在设置localStorage实现持久化存储的时候建议使用try catch语句，因为如果一些用户关闭了本地存储功能或者设置的隐私模式那么localStorage就无法操作，那么就会报错，从而导致程序无法往下执行
let defaultCity = '北京'
try {
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (e) {}

export default createStore({
  state: {
    city: defaultCity
  },
  mutations: {
    changeCity (state, payload) {
      const { value } = payload
      state.city = value
      try {
        localStorage.city = value
      } catch (err) {}
    }
  },
  actions: {
  },
  modules: {
  }
})
