<template>
  <v-app>
    <v-toolbar-title class="text-center py-4 font-weight-medium primary--text">
      Super Heat
    </v-toolbar-title>
    <v-main>
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
