<template>
  <nav
    class="navbar navbar-expand-lg navbar-light"
    style="background-color: #7f3f98"
  >
    <div class="container-fluid">
      <router-link class="navbar-brand text-white" to="/dashboard"
        >UBNOM</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/dashboard"
              >หน้าแรก</router-link
            >
          </li>
        </ul>
      </div>
      <div class="d-flex float-end">
        <button class="btn btn-warning" type="button" @click="clickBack">
          กลับ
        </button>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script setup>
import { useStore } from "vuex";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();

// this.$store.commit("initializeStore");

const store = useStore();

store.commit("initializeStore");

const access = store.state.access;

if (access) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + access;
} else {
  axios.defaults.headers.common["Authorization"] = "";
}

function clickBack() {
  router.go(-1);
}
</script>
