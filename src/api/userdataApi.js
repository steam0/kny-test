import axios from "axios";

export default {
    async getCustomerDetails(token) {
        return axios.get("/api/userdata", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    async getVenues(token) {
        return axios.get("/api/userdata/venues", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    async getVenue(id, token) {
        return axios.get("/api/userdata/venue/"+id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    async getMachine(id, token) {
        return axios.get("/api/userdata/machine/"+id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    async changeMachineState(id, changeMachineStateRequest, token) {
        return axios.post("/api/userdata/machine/"+id+"/change-state", changeMachineStateRequest, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
}