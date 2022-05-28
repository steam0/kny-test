import { createApp } from 'vue';
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue';
import { domain, clientId, audience } from '../auth_config.json';
import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(Vue3Lottie);
app.use(createPinia());

app.use(
  createAuth0({
    domain: domain,
    client_id: clientId,
    audience: audience,
    redirect_uri: window.location.origin,
  })
);

app.mount('#app');
