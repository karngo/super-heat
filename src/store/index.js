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
    indexScores(state, getters) {
      const indexParameters = getters.indexParameters;
      const statData = state?.managerStats?.data || [];

      if (!Array.isArray(statData) || !indexParameters.length) {
        return [];
      }

      return statData.filter(({ parameter }) =>
        indexParameters.includes(parameter)
      );
    },
    managers(state, getters) {
      const scores = getters.indexScores;
      return uniq(scores.map(({ manager }) => manager));
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
