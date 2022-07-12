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
                    <th class="text-left">Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="pa-2">Name 1</td>
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
export default {
  name: "HeatMap",
};
</script>
