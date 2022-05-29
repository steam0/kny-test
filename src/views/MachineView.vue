<template>
  <main>
    <div class="container">
      <div v-if="machine">
        <div class="row">
          <nav class="navbar fixed-top navbar-light bg-white">
            <div class="container-fluid">
              <div class="col-2 text-start">
                <img src="../assets/Desintrygg_symbol.svg" height="35" alt="Logo"/>
              </div>
              <div class="col-10 text-start text-nowrap">
                <RouterLink :to="{ name: 'venue', params: { venueId: this.$route.params.venueId }}" class="text-decoration-none">
                  {{ machine.venue }}
                </RouterLink>
                <em class="bi bi-chevron-right" /> {{ machine.description }}
              </div>
            </div>
          </nav>
        </div>

        <div class="row">
          <Vue3Lottie v-if="machine.history[0].state === 'ON'" :animationData="runningAnimation" />
          <Vue3Lottie v-else :animationData="idleAnimation" />
        </div>

        <div class="row">
          <div class="col">
            <button v-if="machine.history[0].state === 'OFF'" class="btn col-12 btn-primary" :disabled="changeStateLoading" @click="turnOn">
              <span v-if="changeStateLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span v-else>Turn on</span>
            </button>
            <button v-else class="btn col-12 btn-primary" :disabled="changeStateLoading" @click="turnOff">
              <span v-if="changeStateLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span v-else>Turn off</span>
            </button>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col">
            <RouterLink :to="{ name: 'schedule', params: { venueId: this.$route.params.venueId,  machineId: machine.machineId }}" tag="button" class="btn col-12 btn-primary">
              Schedule
            </RouterLink>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col">
            <button class="btn col-12 btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#eventLog">Event log</button>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col">
            <div class="collapse" id="eventLog">
              <div class="row mt-2">
                <div class="col">
                  <ul class="list-group">
                    <li v-for="historyElement in machine.history" class="list-group-item bg-light">
                      <div class="row">
                        <div class="col-3">
                          <p class="text-start"> {{ historyElement.state }}</p>
                        </div>
                        <div class="col-9">
                          <p class="text-end">{{ getTimestampFormat(historyElement.timestamp) }}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="spinner-grow text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
import { useCustomerStore } from "@/stores/CustomerStore";
import desinfectingAnimation from "../assets/DisinfectionInProgress_Loop.json";
import runningAnimation from "../assets/Healthy_Room_NO Loop.json";
import idleAnimation from "../assets/Room_OK_NO Loop.json";
import userdataApi from "../api/userdataApi";
import dayjs from "dayjs/dayjs.min"

export default {
  setup() {
    const { getAccessTokenSilently } = useAuth0();
    const customerStore = useCustomerStore();

    return {
      customerStore,
      desinfectingAnimation,
      idleAnimation,
      runningAnimation,
      getAccessTokenSilently
    };
  },
  data() {
    return {
      machine: null,
      machineId: null,
      changeStateLoading: false,
      loader: null
    }
  },
  mounted() {
    this.machineId = this.$route.params.machineId
    this.getMachine()

    this.loader = setInterval(this.getMachine,5000);
  },
  beforeUnmount() {
    clearInterval(this.loader);
  },
  methods: {
    async getMachine() {
      const token = await this.getAccessTokenSilently()
      const { data } = await userdataApi.getMachine(this.machineId, token)
      this.machine = data
    },

    async turnOn() {
      this.changeStateLoading = true;
      const token = await this.getAccessTokenSilently()
      const { data } = await userdataApi.changeMachineState(this.machineId, { state: "ON" }, token)
      this.machine = data
      this.changeStateLoading = false;
    },

    async turnOff() {
      this.changeStateLoading = true;
      const token = await this.getAccessTokenSilently()
      const { data } = await userdataApi.changeMachineState(this.machineId, { state: "OFF" }, token)
      this.machine = data
      this.changeStateLoading = false;
    },

    getTimestampFormat(dateTimeString) {
      const date = dayjs(dateTimeString)
      return date.format("HH:mm:ss DD.M.YYYY")
    }
  }
};
</script>

<style>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% {  transform: rotate(359deg); }
}

#loading_logo {
  transform-origin: 50% 50%;
  animation: spin 1.2s linear infinite;
}

.spinner {
  transform-origin: 50% 48%;
  animation: spin 1.2s linear infinite;
}

.card {
  border-radius: 10px;
}
</style>