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
    indexParameters(state, getters) {
      return getters.getParameters();
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
      return getters.getParameters(indexParameter);
    },
    getSubTopics: (state, getters) => (indexParameter, topicParameter) => {
      return getters.getParameters(indexParameter, topicParameter);
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
    getSubTopicScores: (state, getters) => (indexParameter, topicParameter) => {
      const subTopics = getters.getSubTopics(indexParameter, topicParameter);
      const statData = state?.managerStats?.data || [];

      if (!Array.isArray(statData)) {
        return [];
      }

      return statData.filter(({ parameter }) => subTopics.includes(parameter));
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
