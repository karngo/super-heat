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
    ...mapGetters([
      "indexParameters",
      "managers",
      "indexScores",
      "getTopicParameters",
      "getTopicScores",
      "getSubTopics",
      "getSubTopicScores",
    ]),
    managerIndexScores() {
      const managerScores = this.managers.map((manager) => {
        const scores = this.indexParameters.map((indexParamter) => {
          const scoreData = this.indexScores.find(
            (indexScore) =>
              indexScore.manager == manager &&
              indexScore.parameter == indexParamter
          );

          return scoreData?.score || 0;
        });

        return scores;
      });

      return managerScores;
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
        return this.managerIndexScores;
      }

      if (!this.selectedTopic) {
        return this.managerTopicScores;
      }

      return this.managerSubTopicScores;
    },
    managerTopicScores() {
      const topicScores = this.getTopicScores(this.selectedIndex);

      const managerTopicScores = this.managers.map((manager) => {
        const scores = this.scoreParameters.map((scoreParameter) => {
          const scoreData = topicScores.find(
            (topicScore) =>
              topicScore.manager == manager &&
              topicScore.parameter == scoreParameter
          );

          return scoreData?.score || 0;
        });

        return scores;
      });

      return managerTopicScores;
    },
    managerSubTopicScores() {
      const subTopicScores = this.getSubTopicScores(
        this.selectedIndex,
        this.selectedTopic
      );

      const managerSubTopicScores = this.managers.map((manager) => {
        const scores = this.scoreParameters.map((scoreParameter) => {
          const scoreData = subTopicScores.find(
            (subTopicScore) =>
              subTopicScore.manager == manager &&
              subTopicScore.parameter == scoreParameter
          );

          return scoreData?.score || 0;
        });

        return scores;
      });

      return managerSubTopicScores;
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
};
</script>
