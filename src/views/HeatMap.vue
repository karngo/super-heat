<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card-text>
            <v-card-title>
              <v-select
                class="px-2"
                placeholder="Select an index"
                :items="indexParameters"
                v-model="selectedIndex"
              ></v-select>
              <v-select
                class="px-2"
                placeholder="Select a Topic"
                :items="topicParameters"
                v-model="selectedTopic"
                :disabled="!selectedIndex"
              ></v-select>
            </v-card-title>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Managers</th>
                    <th v-for="(scoreParameter, i) in scoreParameters" :key="i">
                      {{ scoreParameter }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(manager, mIndex) in managers" :key="mIndex">
                    <td>
                      {{ manager }}
                    </td>
                    <td
                      v-for="(score, sIndex) in managerScores[mIndex]"
                      :key="sIndex"
                    >
                      {{ score }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "HeatMap",
  data() {
    return {
      selectedIndex: "",
      selectedTopic: "",
    };
  },
  computed: {
    ...mapGetters(["getParameters", "getParameterScores", "managers"]),
    indexParameters() {
      return this.getParameters();
    },
    scoreParameters() {
      if (!this.selectedIndex) {
        return this.indexParameters;
      }

      if (!this.selectedTopic) {
        return this.topicParameters;
      }

      return this.subTopicParameters;
    },
    managerScores() {
      if (!this.selectedIndex) {
        return this.getManagerScores(this.indexParameters);
      }

      if (!this.selectedTopic) {
        return this.getManagerScores(this.topicParameters);
      }

      return this.getManagerScores(this.subTopicParameters);
    },
    topicParameters() {
      if (!this.selectedIndex) {
        return [];
      }

      const topicParameters = this.getTopicParameters(this.selectedIndex);
      return topicParameters;
    },
    subTopicParameters() {
      if (!this.selectedTopic) {
        return [];
      }

      return this.getSubTopics(this.selectedIndex, this.selectedTopic);
    },
  },
  methods: {
    getTopicParameters(indexParameter) {
      return this.getParameters(indexParameter);
    },
    getSubTopics(indexParameter, topicParameter) {
      return this.getParameters(indexParameter, topicParameter);
    },
    getManagerScores(parameters) {
      const parameterScores = this.getParameterScores(parameters);

      const managerScores = this.managers.map((manager) => {
        const scores = parameters.map((parameter) => {
          const scoreData = parameterScores.find(
            (parameterScore) =>
              parameterScore.manager == manager &&
              parameterScore.parameter == parameter
          );

          return scoreData?.score || 0;
        });

        return scores;
      });

      return managerScores;
    },
  },
};
</script>
