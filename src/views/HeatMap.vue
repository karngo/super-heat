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
                      v-for="(score, sIndex) in managerIndexScores[mIndex]"
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
    };
  },
  computed: {
    ...mapGetters([
      "indexParameters",
      "managers",
      "indexScores",
      "getTopicParameters",
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

      const topicParameters = this.getTopicParameters(this.selectedIndex);
      return topicParameters;
    },
  },
};
</script>
