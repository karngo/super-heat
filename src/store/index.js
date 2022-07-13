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
    getTopicParameters: (state, getters) => (indexParameter) => {
      if (!getters.indexParameters.includes(indexParameter)) {
        return [];
      }

      const statDefinitions = state?.managerStats?.definitions || [];

      if (!Array.isArray(statDefinitions)) {
        return [];
      }

      const topics = statDefinitions
        .filter(({ index }) => index == indexParameter)
        .map(({ topic }) => topic);

      return topics;
    },
    getTopicScores: (state, getters) => (indexParamter) => {
      if (!getters.indexParameters.includes(indexParamter)) {
        return [];
      }

      const topics = getters.getTopicParameters(indexParamter);
      const statData = state?.managerStats?.data || [];

      if (!Array.isArray(statData)) {
        return [];
      }

      return statData.filter(({ parameter }) => topics.includes(parameter));
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
