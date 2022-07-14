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
            <v-card flat class="text-center yvalue">
              <v-card-text class="py-1 black--text grey lighten-2">
                {{ yValue }}
              </v-card-text>
            </v-card>
          </td>
          <td
            v-for="(tableValue, tIndex) in tableData[yIndex]"
            :key="tIndex"
            class="px-1"
          >
            <v-card flat class="text-center" :class="getStyleClass(tableValue)">
              <v-card-text class="pa-1 tabletext">
                {{ tableValue }}
              </v-card-text>
            </v-card>
          </td>
        </tr>
        <tr>
          <td>
            <v-card outlined class="text-center grey darken-3">
              <v-card-text class="py-1 white--text">
                <v-icon color="white">mdi-bookmark-plus</v-icon>
                Aggregate
              </v-card-text>
            </v-card>
          </td>
          <td
            v-for="(aggregate, aIndex) in aggregates"
            :key="aIndex"
            class="px-1"
          >
            <v-card
              flat
              class="text-center"
              :class="getAggregateStyles(aggregate)"
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
          const columnValues = this.tableData.map((row) => row[index]);
          return (
            sumBy(columnValues, (value) => value * 1) / columnValues.length
          );
        })
        .map((aggregate) => Math.floor(aggregate));

      return aggregates;
    },
  },
  methods: {
    getAggregateStyles(value) {
      if (value * 1 < 2) return "error";
      if (value * 1 < 4) return "warning";
      return "success";
    },
    getStyleClass(value) {
      if (value * 1 < 2) return "error-border";
      if (value * 1 < 4) return "warning-border";
      return "success-border";
    },
  },
};
</script>
<style lang="scss" scoped>
.heatmap {
  tbody tr {
    td {
      .success-border {
        border: solid var(--v-success-base) thin;
        .tabletext {
          background: var(--v-success-lighten4);
        }
      }
      .warning-border {
        border: solid var(--v-warning-base) thin;
        .tabletext {
          background: var(--v-warning-lighten4);
        }
      }
      .error-border {
        border: solid var(--v-error-base) thin;
        .tabletext {
          background: var(--v-error-lighten4);
        }
      }
    }

    td:first-child {
      width: 20%;

      .yvalue {
        border: solid rgb(24, 24, 24) thin;
      }
    }
  }
}
</style>
