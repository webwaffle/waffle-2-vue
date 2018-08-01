import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

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
    }
  }
})
