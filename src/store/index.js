import { isPlainObject, uniq } from "lodash";
import Vue from "vue";
import Vuex from "vuex";
import { fetchManagerStats } from "./api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    managerStats: {},
  },
  getters: {
    getParameters: (state) => (indexParameter, topicParameter) => {
      const managerStatDefinitions = state?.managerStats?.definitions || [];

      if (!Array.isArray(managerStatDefinitions)) {
        return [];
      }

      if (!indexParameter) {
        const indices = uniq(managerStatDefinitions.map(({ index }) => index));
        return indices;
      }

      if (!topicParameter) {
        const topics = managerStatDefinitions
          .filter(({ index }) => index == indexParameter)
          .map(({ topic }) => topic);

        return topics;
      }

      const subTopics = managerStatDefinitions
        .filter(({ index }) => index == indexParameter)
        .filter(({ topic }) => topic == topicParameter)
        .map(({ subTopic }) => subTopic);

      return subTopics;
    },
    getManagerData: (state) => (inputParameter) => {
      const managerStatData = state?.managerStats?.data || [];

      if (!Array.isArray(managerStatData)) {
        return [];
      }

      if (Array.isArray(inputParameter)) {
        const managerData = managerStatData.filter(({ parameter }) =>
          inputParameter.includes(parameter)
        );

        return managerData;
      }

      const managerData = managerStatData.filter(
        ({ parameter }) => inputParameter == parameter
      );

      return managerData;
    },
    managers(state, getters) {
      const indexParameters = getters.getParameters();
      const managerData = getters.getManagerData(indexParameters);
      return uniq(managerData.map(({ manager }) => manager));
    },
  },
  mutations: {
    updateManagerStats(state, managerStats) {
      state.managerStats = managerStats;
    },
  },
  actions: {
    async fetchManagerStats({ commit }) {
      const stats = await fetchManagerStats();
      if (isPlainObject(stats)) {
        commit("updateManagerStats", stats);
      }
    },
  },
});
