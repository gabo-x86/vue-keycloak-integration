<script setup>
import Header from "./Header.vue";
// import { verify, decode } from "jsonwebtoken-esm";
// import { useRouter } from "vue-router";
import { keycloak } from "../utils/keycloak";
import { getAllUsers } from "../service/user.service";
</script>

<template>
  <Header />
  <div class="dashboard">
    <br /><br /><br /><br /><br /><br />
    <h1>{{ greeting }}</h1>
    <h4>Nombre de usuario: {{ username }}</h4>
    <h4>Email: {{ email }}</h4>
    <h4>¿Email verificado?: {{ emailVerified ? "Si" : "No" }}</h4>

    <!-- All users modal -->
    <button
      class="px-5 py-2"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Obtener Usuarios
    </button>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Lista de Usuarios</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <ul>
              <li
                v-for="(user, index) in userData"
                :key="index"
                style="list-style-type: none"
              >
                {{ user.username }}
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="px-5 py-2 btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      greeting: "",
      username: "",
      email: "",
      emailVerified: "",
      userData: []
    };
  },
  mounted() {
    this.loadDashboard();
  },
  methods: {
    async loadDashboard() {
      try {
        const keycloakData = keycloak.tokenParsed;

        this.greeting = `Hola ${keycloakData.given_name} ${keycloakData.family_name}!`;
        this.username = keycloakData.preferred_username;
        this.email = keycloakData.email;
        this.emailVerified = keycloakData.email_verified;
        this.userData = await this.getAllUsers(keycloak.token);
      } catch (error) {
        console.error("Error initializing Keycloak", error);
      }
    },
    async getAllUsers(token) {
      return await getAllUsers(token);
    },
  },
};
</script>
