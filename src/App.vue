<template>
  <v-app>
    <v-main>
      <h2 class="text-center">Super Heat</h2>
      <ManagersDisplay />
    </v-main>
  </v-app>
</template>

<script>
import ManagersDisplay from "./views/ManagersDisplay.vue";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    ManagersDisplay,
  },
  mounted() {
    this.fetchManagerStats();
  },
  methods: {
    ...mapActions(["fetchManagerStats"]),
  },
};
</script>
