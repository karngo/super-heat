<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card-text>
            <v-card-title>
              <v-container class="pa-0">
                <v-row>
                  <v-col class="py-0 text-caption"> Select Drivers </v-col>
                </v-row>
                <v-row>
                  <v-col class="pa-0" cols="12" sm="4">
                    <v-select
                      class="px-2 rounded-0"
                      placeholder="Select an Index"
                      :items="indexParameters"
                      v-model="selectedIndex"
                      @change="selectedTopic = ''"
                      outlined
                      dense
                      clearable
                      prepend-inner-icon="mdi-bullseye"
                      :menu-props="{ 'offset-y': true }"
                    ></v-select>
                  </v-col>
                  <v-col class="pa-0" cols="12" sm="4">
                    <v-select
                      class="px-2 rounded-lg"
                      :placeholder="selectedIndex ? 'Select a Topic' : 'None'"
                      :items="topicParameters"
                      v-model="selectedTopic"
                      :disabled="!selectedIndex"
                      outlined
                      dense
                      clearable
                      :menu-props="{ 'offset-y': true }"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-title>
            <HeatMap
              :yAxis="{ title: 'Managers', icon: 'mdi-account' }"
              :yValues="managers"
              :xValues="scoreParameters"
              :tableData="managerScores"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import HeatMap from "../components/HeatMap.vue";
export default {
  name: "ManagersDisplay",
  components: {
    HeatMap,
  },
  data() {
    return {
      selectedIndex: "",
      selectedTopic: "",
    };
  },
  computed: {
    ...mapGetters(["getParameters", "getManagerData", "managers"]),
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
      const managerData = this.getManagerData(parameters);

      const managerScores = this.managers.map((manager) => {
        const scores = parameters.map((parameter) => {
          const dataValue = managerData.find(
            (data) => data.manager == manager && data.parameter == parameter
          );

          return dataValue?.score || 0;
        });

        return scores;
      });

      return managerScores;
    },
  },
};
</script>
