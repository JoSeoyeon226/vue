// 뷰에서 공통적으로 사용하는 것에 대해 저장해두는 곳
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { //데이터를 저장해 두는 곳
    user: null
  },
  getters: {
  },
  mutations: { //함수를 만들어서 
    setUser(state, user) {
      state.user = user
    },
    logout(state) {
      state.user = null
    }
  },
  actions: {
  },
  modules: {
  }
})
