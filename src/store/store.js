import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export const store = new Vuex.Store({
  state: {
    user: {
      username: null,
      apiKey: null
    }
  },
  getters: {

  },
  mutations: {
    login(state, data) {
      state.user.username = data.username;
      state.user.apiKey = data.apiKey;
    },
    logout(state) {
      state.user.username = null;
      state.user.apiKey = null;
    }
  },
  plugins: [vuexLocal.plugin]
})
