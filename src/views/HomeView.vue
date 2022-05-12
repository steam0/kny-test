<template>
  <main>
    <div class="container">
      <div class="row">
        <button class="btn btn-primary" @click="login">Log in</button>
      </div>
      <div class="row mt-3">
        <button class="btn btn-light" @click="logout">Log out</button>
      </div>
      <div v-if="isAuthenticated" class="row mt-3">
        {{ user }}
      </div>
    </div>
  </main>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  setup() {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

    return {
      login: () => {
        loginWithRedirect();
      },
      logout: () => {
        logout({ returnTo: window.location.origin });
      },
      user,
      isAuthenticated
    };
  }
};
</script>