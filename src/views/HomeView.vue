<template>
  <main>
    <div>
      <img src="../assets/logo.png" height="132" style="vertical-align:middle" alt="Loading"/>
      <button class="btn btn-primary" @click="login">Log in</button>
      <button class="btn btn-secondary" @click="logout">Log out</button>
    </div>
  </main>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  setup() {
    const { loginWithRedirect, logout } = useAuth0();

    return {
      login: () => {
        loginWithRedirect();
      },
      logout: () => {
        logout({ returnTo: window.location.origin });
      }
    };
  }
};
</script>

<style lang="scss">
$primary: #42b983;
$body-color: #304455;
$info:    #73abfe;
$gray-100: #f6f6f6;
$text-muted: #4e6e8e;
$gray-900: #273849;
$dark: #273849;

@import "node_modules/bootstrap/scss/bootstrap";
//@import "src/scss/custom";
</style>