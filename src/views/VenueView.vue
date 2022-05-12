<template>
  <main>
    <div class="container">
      <div v-if="venue">
        <div v-for="machine in venue.machines">
          <div class="row mt-3">
            <RouterLink :to="{ name: 'machine', params: { venueId: this.$route.params.venueId,  machineId: machine.machineId }}">
              <button class="btn btn-primary">{{ machine.description }}</button>
            </RouterLink>
          </div>
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