<template>
  <main>
    <div class="container">
      <div class="row">
        <nav class="navbar fixed-top navbar-light bg-white">
          <div class="container-fluid">
            <div class="col">
              <img src="../assets/logo.png" height="35" alt="Logo"/>
            </div>
          </div>
        </nav>
      </div>

      <div class="row mt-3">
        <div class="col">
          <button class="btn col-12 btn-primary text-light" type="button" data-bs-toggle="collapse" data-bs-target="#how">How does it work</button>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col">
          <div class="collapse" id="how">
            <div class="row mt-2">
              <div class="col">
                <div class="card bg-light">
                  <div class="card-body">
                    This is some text within a card body.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col">
          <button class="btn col-12 btn-primary text-light" type="button" data-bs-toggle="collapse" data-bs-target="#covid">Covid-19</button>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col">
          <div class="collapse" id="covid">
            <div class="row mt-2">
              <div class="col">
                <div class="card bg-light">
                  <div class="card-body">
                    This is some text within a card body.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!isAuthenticated" class="row mt-2">
        <div class="col">
          <button class="btn col-12 btn-success" @click="login">Log in</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  setup() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return {
      login: () => {
        loginWithRedirect();
      },
      isAuthenticated
    };
  }
};
</script>