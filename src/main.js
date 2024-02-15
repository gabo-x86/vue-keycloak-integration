import App from './App.vue';
import { createApp } from 'vue'
import router from './utils/router';
import './style.css';
import { keycloakInit } from "./utils/keycloak";

await keycloakInit();

const app = createApp(App);

app.use(router);

app.mount('#app');
