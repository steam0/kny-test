<template>
  <main>
    <div class="container">
      <div v-if="machine">
        <div class="row">
          <nav class="navbar fixed-top navbar-light bg-white" style="font-size: 0.8rem">
            <div class="container-fluid">
              <div class="col-2 text-start">
                <img src="../assets/Desintrygg_symbol.svg" height="35" alt="Logo"/>
              </div>
              <div class="col-10 text-start text-nowrap">
                <RouterLink :to="{ name: 'venue', params: { venueId: this.$route.params.venueId }}" class="text-decoration-none">
                  {{ machine.venue }}
                </RouterLink>
                <em class="bi bi-chevron-right" /> <span class="fw-bold">{{ machine.description }}</span>
              </div>
            </div>
          </nav>
        </div>

        <div class="row mt-5">
          <div v-if="machine.history[0].state === 'ON'">
            <Vue3Lottie :animationData="disinfectingAnimation" />
          </div>
          <div v-else>
            <Vue3Lottie v-if="offAnimation === 1" :animationData="startupAnimation" :loop="false" @onComplete="offAnimation = 2" />
            <Vue3Lottie v-if="offAnimation === 2" :animationData="restAnimation" :loop="true" />
          </div>
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

        <div class="row mt-3">
          <div class="col">
            <div class="collapse" id="eventLog">
              <div class="row mt-2">
                <div class="col">
                  <ul class="list-group">
                    <li v-for="historyElement in machine.history" class="list-group-item bg-light">
                      <div class="row">
                        <div class="col-3">
                          <p class="text-start fw-bold"> {{ historyElement.state }}</p>
                        </div>
                        <div class="col-9">
                          <p class="text-end">{{ getTimeFormat(historyElement.timestamp) }} <span class="fw-bold">{{ getDateFormat(historyElement.timestamp) }}</span></p>
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
import disinfectingAnimation from "../assets/disinfecting.json";
import runningAnimation from "../assets/Healthy_Room_NO Loop.json";
import startupAnimation from "../assets/StartUp_Animation_NO Loop.json";
import idleAnimation from "../assets/Room_OK_NO Loop.json";
import restAnimation from "../assets/Rest_animation_Loop.json";
import userdataApi from "../api/userdataApi";
import dayjs from "dayjs/dayjs.min"

export default {
  setup() {
    const { getAccessTokenSilently } = useAuth0();
    const customerStore = useCustomerStore();

    return {
      customerStore,
      disinfectingAnimation,
      idleAnimation,
      runningAnimation,
      startupAnimation,
      restAnimation,
      getAccessTokenSilently
    };
  },
  data() {
    return {
      machine: null,
      machineId: null,
      changeStateLoading: false,
      loader: null,
      offAnimation: 1,
      animations: []
    }
  },
  async mounted() {
    localStorage.setItem("venueId", this.$route.params.venueId);
    localStorage.setItem("machineId", this.$route.params.machineId);
    this.machineId = this.$route.params.machineId
    await this.getMachine();
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
      this.offAnimation = 1; // Restart animations
      const token = await this.getAccessTokenSilently()
      const { data } = await userdataApi.changeMachineState(this.machineId, { state: "OFF" }, token)
      this.machine = data
      this.changeStateLoading = false;
    },

    getTimeFormat(dateTimeString) {
      const date = dayjs(dateTimeString)
      return date.format("HH:mm:ss")
    },

    getDateFormat(dateTimeString) {
      const date = dayjs(dateTimeString)
      return date.format("DD.M.YYYY")
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