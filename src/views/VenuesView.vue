<template>
  <main>
    <div class="container">
      <div class="row">
        <nav class="navbar fixed-top navbar-light bg-white" style="font-size: 0.8rem">
          <div class="container-fluid">
            <div class="col-2 text-start">
              <img src="../assets/Desintrygg_symbol.svg" height="35" alt="Logo"/>
            </div>
            <div class="col-10 text-start">
              Venues
            </div>
          </div>
        </nav>
      </div>
      <div v-if="isAuthenticated" class="row mt-3">
        <div class="btn-group-vertical" role="group">
            <RouterLink v-for= "venue in customerStore.venues"  :to="{ name: 'venue', params: { venueId: venue.venueId }}" tag="button" class="btn btn-primary btn-lg">
              {{ venue.name }}<span class="bi chevron-right"></span>
            </RouterLink>
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
      customerStore
    };
  }
};
</script>