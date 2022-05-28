<template>
  <div v-if="!isAuthenticated && isLoading">
<!--    <img id="loading_logo" src="./assets/Desintrygg_symbol.svg" height="125" style="vertical-align:middle" alt="Loading"/>-->
    <Vue3Lottie :animationData="startupAnimation" :height="350" />
  </div>
  <div v-else>
<!--    <Vue3Lottie :animationData="startupAnimation" :height="350" />-->
    <div class="row">
      <RouterView />
    </div>
    <div class="row">
      <nav class="navbar fixed-bottom navbar-secondary bg-light">
        <div class="container">
          <RouterLink to="/" style="text-decoration: none">
            <div class="row">
              <div class="col ml-3">
                <h4><em class="bi bi-house-heart"></em></h4>
  <!--              <img src="./assets/Hjem_Blaa.svg" height="28" style="vertical-align:middle" alt="Loading"/>-->
                <p>Home</p>
              </div>
            </div>
          </RouterLink>
          <RouterLink to="/venues" style="text-decoration: none">
            <div class="row">
              <div class="col">
                <h4><em class="bi bi-geo-alt"></em></h4>
  <!--              <img src="./assets/Lokasjon_Blaa.svg" height="28" style="vertical-align:middle" alt="Loading"/>-->
                <p>Venues</p>
              </div>
            </div>
          </RouterLink>
          <RouterLink to="/profile" style="text-decoration: none">
            <div class="row">
              <div class="col mr-3">
                <h4><em class="bi bi-gear"></em></h4>
  <!--              <img src="./assets/Innstillinger_Blaa.svg" height="28" style="vertical-align:middle" alt="Loading"/>-->
                <p>Settings</p>
              </div>
            </div>
          </RouterLink>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
import { useCustomerStore } from "./stores/CustomerStore";
import startupAnimation from "./assets/StartUp_Animation_NO Loop.json";

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

        console.log("HELLO")
        if (isAuthenticated.value) {
          console.log("DONE DONE DONE")
          this.fetchCustomerDetails()
        }
      },
      logout: () => {
        logout({ returnTo: window.location.origin });
      },
      isLoading,
      user,
      isAuthenticated,
      loginWithRedirect,
      userStore,
      startupAnimation
    };
  },
  async mounted() {
    console.log("Mounted")
    console.log(this.isAuthenticated)

    if (this.isAuthenticated) {
      this.fetchCustomerDetails()
    } else {
      // this.login()
    }
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

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% {  transform: rotate(359deg); }
}

#loading_logo {
  transform-origin: 50% 59%;
  animation: spin 0.9s ease-in infinite;
}
</style>