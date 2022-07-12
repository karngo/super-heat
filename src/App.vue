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

export default {
  name: "App",
  components: {
    HeatMap,
  },
  data: () => ({
    //
  }),
};
</script>
