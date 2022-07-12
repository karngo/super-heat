import { uniq } from "lodash";
import Vue from "vue";
import Vuex from "vuex";
import data from "../data";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    managerStats: data,
  },
  getters: {
    indexParameters(state) {
      const statDefinitions = state?.managerStats?.definitions || [];

      if (!Array.isArray(statDefinitions)) {
        return [];
      }

      const indices = uniq(statDefinitions.map(({ index }) => index));

      return indices;
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
