<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Managers</th>
                    <th v-for="(indexParameter, i) in indexParameters" :key="i">
                      {{ indexParameter }}
                    </th>
                  </tr>
                </thead>
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
  computed: {
    ...mapGetters(["indexParameters"]),
  },
};
</script>
