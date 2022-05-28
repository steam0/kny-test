<template>
  <main>
    <div class="container">
      <pre v-if="isAuthenticated">
        <div class="row">
          <div class="col">
            <div class="card">
              <div class="card-body">
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
              </div>
            </div>
          </div>
        </div>
      </pre>
      <div class="row mt-3">
        <div class="col">
          <a href="mailto:kontakt@desintrygg.no" target="_blank" class="btn col-12 btn-outline-primary">Contact us</a>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <button class="btn col-12 btn-outline-primary" @click="logout">Log out</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
import { useCustomerStore } from "@/stores/CustomerStore";

export default {
  setup() {
    const { user, isAuthenticated, logout, getAccessTokenSilently } = useAuth0();
    const customerStore = useCustomerStore();

    return {
      user,
      isAuthenticated,
      getAccessTokenSilently,
      async fetchCustomerDetails() {
        const token = await this.getAccessTokenSilently()
        customerStore.fetchCustomerDetails(token)
      },
      customerStore,
      logout: () => {
        logout({ returnTo: window.location.origin });
      },
    };
  },
  mounted() {
    this.fetchCustomerDetails()
  }
};
</script>