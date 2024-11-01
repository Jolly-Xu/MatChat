import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn: false,
    userinfo: null
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    // 获取用户信息
    userinfo: state => state.userinfo
  },
  mutations: {
    set_USER(state, userData) {
      state.isLoggedIn = true;
      state.userinfo = userData;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userinfo = null;
    }
  },
  actions: {
    setUser({ commit }, userData) {
      // 这里可以添加你的登录逻辑，例如API调用
      // 假设登录成功后，我们得到用户数据
      commit('set_USER', userData);
    },
    // 登出操作
    deleteuser({ commit }) {
      commit('logout');
    }
  },
  modules: {
  }
})
