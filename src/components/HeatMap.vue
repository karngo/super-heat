<template>
  <v-simple-table class="heatmap">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">
            <v-icon dense>{{ yAxis.icon }}</v-icon>
            {{ yAxis.title }}
          </th>
          <th
            v-for="(xValue, xIndex) in xValues"
            :key="xIndex"
            class="text-center"
          >
            {{ xValue }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(yValue, yIndex) in yValues" :key="yIndex">
          <td>
            <v-card outlined class="text-center grey darken-3">
              <v-card-text class="py-1 white--text">
                {{ yValue }}
              </v-card-text>
            </v-card>
          </td>
          <td
            v-for="(tableValue, tIndex) in tableData[yIndex]"
            :key="tIndex"
            class="px-1"
          >
            <v-card
              outlined
              class="text-center"
              :color="getHeatColor(tableValue)"
            >
              <v-card-text class="pa-1">
                {{ tableValue }}
              </v-card-text>
            </v-card>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  name: "HeatMap",
  props: {
    yAxis: Object,
    yValues: {
      type: Array,
      default() {
        return [];
      },
    },
    xValues: {
      type: Array,
      default() {
        return [];
      },
    },
    tableData: Array,
  },
  methods: {
    getHeatColor(value) {
      if (value * 1 < 2) return "error";
      if (value * 1 < 4) return "warning";
      return "success";
    },
  },
};
</script>
<style lang="scss" scoped>
.heatmap ::v-deep {
  tbody tr td:first-child {
    width: 20%;
  }
}
</style>
