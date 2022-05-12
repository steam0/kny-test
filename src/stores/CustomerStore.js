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
            selectedVenue: {}
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
                this.customer = response.data.customer
                this.phoneNumber = response.data.customer.phoneNumber;
            })
        },
        fetchVenues(token) {
            userdataApi.getVenues(token).then(response => {
                this.venues = response.data
            })
        },
        fetchVenue(venueId) {
            if (this.venues != null) {
                return this.venues.filter(venue => venue.venueId == venueId)[0]
            } else {
                return null
            }
        },
        fetchMachine(venueId, machineId) {
            if (this.venues != null) {
                console.log(venueId)
                let venue = this.venues.filter(venue => venue.venueId == venueId)[0]
                console.log(venue)
                console.log(machineId)
                let machine = venue.machines.filter(machine => machine.machineId == machineId)[0]
                console.log(machine)
                return machine
            } else {
                return null
            }
        }
    }
})