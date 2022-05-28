<template>
  <main>
    <div class="container">
      <div class="row">
        <h4>Machines</h4>
      </div>
      <div v-if="venue" class="row mt-3">
        <div class="btn-group-vertical" role="group">
          <RouterLink v-for= "machine in venue.machines"  :to="{ name: 'machine', params: { venueId: this.$route.params.venueId,  machineId: machine.machineId }}" tag="button" class="btn btn-primary btn-lg">
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
  computed: {
    venue() {
      return this.customerStore.fetchVenue(this.$route.params.venueId)
    }
  }
};
</script>