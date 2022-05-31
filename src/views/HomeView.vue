<template>
  <main>
    <div class="container">
      <div class="position-absolute top-50 start-50 translate-middle">
        <div class="row">
          <div class="col">
            <img src="../assets/logo.svg" height="50" alt="Logo"/>
          </div>
        </div>
        <div v-if="!isAuthenticated" class="row mt-3">
          <div class="col">
            <button class="btn col-12 btn-success btn-lg" @click="login">Log in</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';
import { useCustomerStore } from "@/stores/CustomerStore";

export default {
  setup() {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const customerStore = useCustomerStore();

    return {
      login: () => {
        loginWithRedirect({ redirect_uri: window.location.origin + "/home"});
      },
      isAuthenticated,
      isLoading,
      customerStore
    };
  },

  mounted() {
    if (this.isLoading === true) {
      // Watch for the loading property to change before we check isAuthenticated
      this.$watch("isLoading", loading => {
        if (loading === false) {
          if (this.isAuthenticated) {
            // Go to latest used machine
            this.goToLatestUsedMachine()
          }
        }
      });
    } else {
      if (this.isAuthenticated) {
        // Go to latest used machine
        this.goToLatestUsedMachine()
      } else {
        // You are not authenticated, stay here
      }
    }
  },

  methods: {
    goToLatestUsedMachine() {
      console.log("Going to latest used machine or venues if no latest machine exist");
      const venueId = localStorage.getItem('venueId')
      const machineId = localStorage.getItem('machineId')

      if (venueId != null && machineId != null) {
        console.log(`Push to machine: ${machineId} in venue: ${venueId}`);
        this.$router.push({ name: 'machine', params: { venueId: venueId,  machineId: machineId }});
      } else {
        console.log("Push to venues");
        this.$router.push({ name: 'venues' });
      }
    }
  }
};
</script>