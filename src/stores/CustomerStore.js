import { defineStore } from 'pinia';
import userdataApi from "../api/userdataApi";

export const useCustomerStore = defineStore("CustomerStore", {
    // State
    state: () => {
        return {
            name: '',
            orgnr: '',
            email: '',
            phoneNumber: '',
            customer: {},
            user: {},
            venues: [],
            selectedVenue: {},
            machine: {}
        };
    },

    // Actions
    actions: {
        fetchCustomerDetails(token) {
            userdataApi.getCustomerDetails(token).then(response => {
                this.user = response.data;
                this.name = response.data.customer.name;
                this.orgnr = response.data.customer.orgnr;
                this.email = response.data.customer.email;
                this.venues = response.data.venues;
                this.customer = response.data.customer
                this.phoneNumber = response.data.customer.phoneNumber;
            })
        },
        fetchVenues(token) {
            userdataApi.getVenues(token).then(response => {
                this.venues = response.data;
            })
        },
        fetchVenue(venueId) {
            if (this.venues != null) {
                this.selectedVenue = this.venues.filter(venue => venue.venueId == venueId)[0];
                return this.selectedVenue;
            } else {
                return null
            }
        },
        async fetchMachine(machineId, token) {
            const { data } = await userdataApi.getMachine(machineId, token)
            this.machine = data
        },
        async turnMachineOn(machineId, token) {
            const { data } = await userdataApi.changeMachineState(machineId, { state: "ON" }, token)
            this.machine = data
        },
        async turnMachineOff(machineId, token) {
            const { data } = await userdataApi.changeMachineState(machineId, { state: "OFF" }, token)
            this.machine = data
        }
    }
})