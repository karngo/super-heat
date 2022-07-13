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
        <tr>
          <td>
            <v-card outlined class="text-center grey darken-3">
              <v-card-text class="py-1 white--text"> Aggregate </v-card-text>
            </v-card>
          </td>
          <td
            v-for="(aggregate, aIndex) in aggregates"
            :key="aIndex"
            class="px-1"
          >
            <v-card
              outlined
              class="text-center"
              :color="getHeatColor(aggregate)"
            >
              <v-card-text class="pa-1">
                {{ aggregate }}
              </v-card-text>
            </v-card>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import { sumBy } from "lodash";
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
  computed: {
    aggregates() {
      const xValues = this.xValues;
      const aggregates = xValues
        .map((value, index) => {
          const columnValues = this.tableData[index];
          return sumBy(columnValues, (value) => value * 1) / xValues.length;
        })
        .map((aggregate) => Math.floor(aggregate));

      return aggregates;
    },
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
