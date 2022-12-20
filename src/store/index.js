import { createStore } from "vuex";

export default createStore({
  state: {
    access: "",
  },
  getters: {},
  mutations: {
    setAccess(state, access) {
      state.access = access;
    },
    initializeStore(state) {
      if (localStorage.getItem("access")) {
        state.access = localStorage.getItem("access");
      } else {
        state.access = "";
      }
    },
  },
  actions: {},
  modules: {},
});
