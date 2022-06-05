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
                <RouterLink :to="{ name: 'machine', params: { venueId: this.$route.params.venueId,  machineId: machine.machineId }}" class="text-decoration-none">
                  {{ machine.description }}
                </RouterLink>
                <em class="bi bi-chevron-right" /> Schedule
              </div>
            </div>
          </nav>
        </div>

        <div v-if="isAuthenticated">
          <div class="row">
            <div class="col">
              <div class="row mt-3">
                <Datepicker v-model="startTime" timePicker />
              </div>
              <div class="row mt-3">
                <Datepicker v-model="endTime" timePicker />
              </div>
            </div>
          </div>

          <div v-if="machine.schedule" class="row mt-3">
            <div class="col">
              <div class="alert alert-primary" role="alert">
                <div class="row">
                  <div class="col-2">
                    <em class="bi bi-info-circle" />
                  </div>
                  <div class="col-10 text-start">
                    <p class="fw-bold"> Current schedule: </p>
                  </div>
                </div>

                <div class="row">
                  <div class="col text-start">
                    Start time: {{ machine.schedule.startTime }}
                  </div>
                </div>

                <div class="row">
                  <div class="col text-start">
                    End time: {{ machine.schedule.endTime }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="row mt-3">
            <div class="col">
              <div class="alert alert-primary" role="alert">
                <div class="row">
                  <div class="col-2">
                    <em class="bi bi-info-circle" />
                  </div>
                  <div class="col-10 text-start">
                    <span>No schedule registered for this machine </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col">
            <button class="btn col-12 btn-primary" :disabled="saveLoading" @click="saveSchedule">
              <span v-if="saveLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span v-else>Save</span>
            </button>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col">
            <button class="btn col-12 btn-outline-danger" :disabled="deleteLoading" @click="deleteSchedule">
              <span v-if="deleteLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span v-else>Delete schedule</span>
            </button>
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
import { ref } from 'vue';
import { useAuth0 } from "@auth0/auth0-vue";
import { useCustomerStore } from "@/stores/CustomerStore";
import userdataApi from "../api/userdataApi";

export default {
  setup() {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const customerStore = useCustomerStore();
    const startTime = ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    });

    const endTime = ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    });

    return {
      startTime,
      endTime,
      isAuthenticated,
      getAccessTokenSilently,
      async fetchCustomerDetails() {
        const token = await this.getAccessTokenSilently()
        customerStore.fetchCustomerDetails(token)
      },
      customerStore
    };
  },
  data() {
    return {
      machine: null,
      machineId: null,
      saveLoading: false,
      deleteLoading: false
    }
  },
  mounted() {
    this.machineId = this.$route.params.machineId
    this.getMachine()
  },
  methods: {
    async getMachine() {
      const token = await this.getAccessTokenSilently()
      const { data } = await userdataApi.getMachine(this.machineId, token)
      this.machine = data
    },

    async saveSchedule() {
      this.saveLoading = true;
      const start = `${String(this.startTime.hours).padStart(2, '0')}:${String(this.startTime.minutes).padStart(2, '0')}:00`
      const end = `${String(this.endTime.hours).padStart(2, '0')}:${String(this.endTime.minutes).padStart(2, '0')}:00`

      const token = await this.getAccessTokenSilently()
      await userdataApi.saveSchedule(this.machineId, { startTime: start, endTime: end }, token)

      await this.getMachine()
      this.saveLoading = false;
    },

    async deleteSchedule() {
      this.deleteLoading = true;
      const token = await this.getAccessTokenSilently()
      await userdataApi.deleteSchedule(this.machineId, token)

      await this.getMachine()
      this.deleteLoading = false;
    }
  }
};
</script>