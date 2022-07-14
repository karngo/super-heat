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
      const statDefinitions = state?.managerStats?.definitions || [];

      if (!Array.isArray(statDefinitions)) {
        return [];
      }

      if (!indexParameter) {
        const indices = uniq(statDefinitions.map(({ index }) => index));
        return indices;
      }

      if (!topicParameter) {
        const topics = statDefinitions
          .filter(({ index }) => index == indexParameter)
          .map(({ topic }) => topic);

        return topics;
      }

      const subTopics = statDefinitions
        .filter(({ index }) => index == indexParameter)
        .filter(({ topic }) => topic == topicParameter)
        .map(({ subTopic }) => subTopic);

      return subTopics;
    },
    getParameterScores: (state) => (inputParameter) => {
      const statData = state?.managerStats?.data || [];

      if (!Array.isArray(statData)) {
        return [];
      }

      if (Array.isArray(inputParameter)) {
        const scores = statData.filter(({ parameter }) =>
          inputParameter.includes(parameter)
        );

        return scores;
      }

      const scores = statData.filter(
        ({ parameter }) => inputParameter == parameter
      );

      return scores;
    },
    managers(state, getters) {
      const indexParameters = getters.getParameters();
      const scores = getters.getParameterScores(indexParameters);
      return uniq(scores.map(({ manager }) => manager));
    },
  },
  mutations: {
    updateManagerStats(state, stats) {
      state.managerStats = stats;
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
