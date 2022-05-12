<template>
  <main>
    <div class="container">
      <div v-if="machine">
        {{ machine }}
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
    machine() {
      return this.customerStore.fetchMachine(this.$route.params.venueId, this.$route.params.machineId)
    }
  }
};
</script>