import { createApp } from 'vue'
import { createAuth0 } from '@auth0/auth0-vue';
import { domain, clientId, audience } from "../auth_config.json";
import App from './App.vue'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)

app.use(router)

app.use(
    createAuth0({
        domain: domain,
        client_id: clientId,
        audience: audience,
        redirect_uri: window.location.origin
    })
);

app.mount('#app')
