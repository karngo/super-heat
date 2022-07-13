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
                @change="selectedTopic = ''"
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
                    <th class="text-center">Managers</th>
                    <th
                      v-for="(scoreParameter, i) in scoreParameters"
                      :key="i"
                      class="text-center"
                    >
                      {{ scoreParameter }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(manager, mIndex) in managers" :key="mIndex">
                    <td>
                      <v-card outlined class="text-center grey darken-3">
                        <v-card-text class="py-1 white--text">
                          {{ manager }}
                        </v-card-text>
                      </v-card>
                    </td>
                    <td
                      v-for="(score, sIndex) in managerScores[mIndex]"
                      :key="sIndex"
                      class="px-1"
                    >
                      <v-card
                        outlined
                        class="text-center"
                        :color="getHeatColor(score)"
                      >
                        <v-card-text class="pa-1">
                          {{ score }}
                        </v-card-text>
                      </v-card>
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

      const topicParameters = this.getParameters(this.selectedIndex);
      return topicParameters;
    },
    subTopicParameters() {
      if (!this.selectedTopic) {
        return [];
      }

      return this.getParameters(this.selectedIndex, this.selectedTopic);
    },
  },
  methods: {
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
    getHeatColor(score) {
      if (score * 1 < 2) return "error";
      if (score * 1 < 4) return "warning";
      return "success";
    },
  },
};
</script>
