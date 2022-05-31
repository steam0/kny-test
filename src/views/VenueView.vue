<template>
  <main>
    <div class="container">
      <div class="row">
        <nav class="navbar fixed-top navbar-light bg-white">
          <div class="container-fluid">
            <div class="col-2 text-start">
              <img src="../assets/Desintrygg_symbol.svg" height="35" alt="Logo"/>
            </div>
            <div v-if="customerStore.selectedVenue" class="col-10 text-start">
              <RouterLink :to="{ name: 'venues'}" class="text-decoration-none">
                Venues
              </RouterLink>
              <em class="bi bi-chevron-right"/> {{ customerStore.selectedVenue.name }}
            </div>
          </div>
        </nav>
      </div>
      <div v-if="customerStore.selectedVenue" class="row mt-3">
        <div class="btn-group-vertical" role="group">
          <RouterLink v-for= "machine in customerStore.selectedVenue.machines"  :to="{ name: 'machine', params: { venueId: this.$route.params.venueId,  machineId: machine.machineId }}" tag="button" class="btn btn-primary btn-lg">
            {{ machine.description }}
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useCustomerStore } from "@/stores/CustomerStore";
export default {
  setup() {
    const customerStore = useCustomerStore();

    return {
      customerStore
    };
  },
  mounted() {
    this.customerStore.fetchVenue(this.$route.params.venueId)
  }
};
</script>