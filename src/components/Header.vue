<script setup>
import { useRouter } from "vue-router";
import { keycloak } from "../utils/keycloak";
</script>
<template>
  <header>
    <nav class="px-5 py-3 navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">Gestión Académica</router-link>
        <router-link v-if="authenticated" to="/dashboard" class="fs-6 text-primary navbar-brand">
          Dashboard
        </router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <button v-if="!authenticated" @click="login" class="btn btn-primary">
                <router-link to="/dashboard" class="nav-link">Iniciar Sesión</router-link>
              </button>
              <button v-else @click="logout" class="btn btn-danger">Cerrar Sesión</button>
            </li>
            <li v-if="!authenticated" class="px-5 py-2 nav-item">
              <router-link to="/home" @click="register" class="nav-link"
                >Registrarse</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <router-view></router-view>
</template>

<script>
export default {
  data() {
    return {
      authenticated: false,
    };
  },
  mounted() {
    this.loadHeader();
  },
  methods: {
    async loadHeader() {
      this.authenticated = keycloak.token ? true : false;
    },
    async login() {
      await keycloak.login();
    },
    async logout() {
      await keycloak.logout();
    },
    async register() {
      await keycloak.register();
    },
  },
};
</script>

<style scoped></style>
