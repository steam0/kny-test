<template>
  <main>
    <div class="container">
      <div class="row">
        <nav class="navbar fixed-top navbar-light bg-white"  style="font-size: 0.8rem">
          <div class="container-fluid">
            <div class="col-2 text-start">
              <img src="../assets/Desintrygg_symbol.svg" height="35" alt="Logo"/>
            </div>
            <div class="col-10 text-start text-nowrap">
              Profile <em class="bi bi-chevron-right" />
            </div>
          </div>
        </nav>
      </div>
      <div v-if="isAuthenticated">
        <div class="row">
          <div class="col">
            <div class="card bg-light">
              <div class="card-body">
                <p class="fw-bold">{{customerStore.name}}</p>
                <p>{{customerStore.orgnr}}</p>
                <p>{{customerStore.phoneNumber}}</p>
                <p>{{customerStore.email}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <a href="mailto:kontakt@desintrygg.no" target="_blank" class="btn col-12 btn-outline-primary">Contact us</a>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <button class="btn col-12 btn-outline-danger" @click="logout">Log out</button>
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