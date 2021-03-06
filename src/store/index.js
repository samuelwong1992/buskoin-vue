import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
  },
  mutations: {
    LOGIN_SUCCESS(state, token) {
      state.token = token;
    },
    LOGOUT(state) {
      state.token = null;
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
