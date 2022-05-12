<template>
  <RouterView />
  <header>
    <div class="wrapper">
      <nav class="navbar fixed-bottom navbar-secondary bg-secondary">
        <div class="container">
          <RouterLink to="/">
            <div class="row">
              <div class="col ml-3">
                <img src="./assets/Hjem_Blaa.svg" height="35" style="vertical-align:middle" alt="Loading"/>
                <p class="mt-1">Home</p>
              </div>
            </div>
          </RouterLink>
          <RouterLink to="/venues">
            <div class="row">
              <div class="col">
                <img src="./assets/Lokasjon_Blaa.svg" height="35" style="vertical-align:middle" alt="Loading"/>
                <p class="mt-1">Venues</p>
              </div>
            </div>
          </RouterLink>
          <RouterLink to="/profile">
            <div class="row">
              <div class="col mr-3">
                <img src="./assets/Innstillinger_Blaa.svg" height="35" style="vertical-align:middle" alt="Loading"/>
                <p class="mt-1">Settings</p>
              </div>
            </div>
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { useAuth0 } from "@auth0/auth0-vue";
import { useCustomerStore } from "./stores/CustomerStore";

export default {
  setup() {
    const { loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
    const userStore = useCustomerStore();

    return {
      async fetchCustomerDetails() {
        console.log(isAuthenticated.value)
        if (isAuthenticated.value) {
          const token = await getAccessTokenSilently();
          userStore.fetchCustomerDetails(token)
        }
      },
      async login() {
        loginWithRedirect();

        if (isAuthenticated.value) {
          this.fetchCustomerDetails()
        }
      },
      logout: () => {
        logout({ returnTo: window.location.origin });
      },
      isLoading,
      user,
      isAuthenticated,
      loginWithRedirect
    };
  },
  async mounted() {
    console.log("Mounted")
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>