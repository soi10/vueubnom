<template>
  <div class="container">
    <div class="card mt-3">
      <div class="card-header">แผนกปฏิบัติงาน</div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="mb-3 row">
            <label for="" class="col-sm-2 col-form-label">รหัสพนักงาน</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="username" />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="" class="col-sm-2 col-form-label">รหัสเข้าคอม</label>
            <div class="col-sm-10">
              <input
                type="password"
                class="form-control"
                id="inputPassword"
                v-model="password"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <button type="submit" class="btn btn-primary">เข้าระบบ</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";

const username = ref("");
const password = ref("");

const route = useRouter();
const store = useStore();

async function submitForm() {
  axios.defaults.headers.common["Authorization"] = "";
  localStorage.removeItem("access");

  const formData = {
    username: username.value,
    password: password.value,
  };

  try {
    const response = await axios.post("/auth/login", formData);
    const access = response.data.token;

    store.commit("setAccess", access);

    axios.defaults.headers.common["Authorization"] = "Bearer " + access;

    localStorage.setItem("access", access);

    route.push("/dashboard");
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error,
      icon: "error",
    });
  }
}
</script>
