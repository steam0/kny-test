<template>
  <main>
    <div class="container">
      <div v-if="isAuthenticated" class="row mt-3">
<!--        {{ customerStore.venues }}-->

        <div v-for="venue in customerStore.venues">
          <div class="row mt-3">
            <RouterLink :to="{ name: 'venue', params: { venueId: venue.venueId }}">
              <button class="btn btn-primary">{{ venue.name }}</button>
            </RouterLink>
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
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const customerStore = useCustomerStore();

    return {
      isAuthenticated,
      getAccessTokenSilently,
      customerStore,
      async fetchVenues() {
        const token = await this.getAccessTokenSilently()
        customerStore.fetchVenues(token)
      },
    };
  },
  mounted() {
    this.fetchVenues()
  }
};
</script>