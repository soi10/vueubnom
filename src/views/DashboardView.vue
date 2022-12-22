<template>
  <div class="container mt-3">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="button in buttons" :key="button.id">
        <div class="card h-100">
          <!-- <img
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
            class="card-img-top"
            alt="Hollywood Sign on The Hill"
          /> -->
          <div class="card-body">
            <h5 class="card-title">{{ button.title }}</h5>
            <p class="card-text">
              {{ button.text }}
            </p>
            <RouterLink :to="`${button.url}`" class="btn btn-primary">{{
              button.button
            }}</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const buttons = ref([
  {
    title: "ควบคุมงานหมายเลข WBS",
    text: "ควบคุมงานหมายเลข WBS และคู่มือวิธีทำทุกขั้นตอน",
    button: "ติดตามงานหมายเลข WBS",
    url: "wbs",
  },
  // {
  //   title: "Vic",
  //   text: "Reynolds",
  //   button: "vic.reynolds@test.com",
  //   url: "",
  // },
]);
</script>
