<template>
  <main>
    <div class="container">
      <div class="row mt-3">
        <pre v-if="isAuthenticated">
          <div class="input-group">
            <span class="input-group-text">Name  </span>
            <input type="text" class="form-control" placeholder="Name" aria-label="Name" v-model="customerStore.name" disabled>
          </div>
          <div class="input-group">
            <span class="input-group-text">Orgnr</span>
          <input type="text" class="form-control" placeholder="Orgnr" aria-label="Orgnr" v-model="customerStore.orgnr" disabled>
          </div>
          <div class="input-group">
            <span class="input-group-text">Email</span>
            <input type="text" class="form-control" placeholder="Email" aria-label="Email" v-model="customerStore.email" disabled>
          </div>
          <div class="input-group">
            <span class="input-group-text">Phone</span>
            <input type="text" class="form-control" placeholder="Phone" aria-label="Phone" v-model="customerStore.phoneNumber" disabled>
          </div>
        </pre>
      </div>
    </div>
  </main>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
import { useCustomerStore } from "@/stores/CustomerStore";

export default {
  setup() {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const customerStore = useCustomerStore();

    return {
      user,
      isAuthenticated,
      getAccessTokenSilently,
      async fetchCustomerDetails() {
        const token = await this.getAccessTokenSilently()
        customerStore.fetchCustomerDetails(token)
      },
      customerStore
    };
  },
  mounted() {
    this.fetchCustomerDetails()
  }
};
</script>