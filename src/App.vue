<template>
  <v-app>
    <v-main>
      <h2 class="text-center">Super Heat</h2>
      <HeatMap />
    </v-main>
  </v-app>
</template>

<script>
import HeatMap from "./views/HeatMap.vue";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    HeatMap,
  },
  mounted() {
    this.fetchManagerStats();
  },
  methods: {
    ...mapActions(["fetchManagerStats"]),
  },
};
</script>
