<template>
  <div class="my-1">
    <h3>คู่มือ / เอกสาร / ข้อเสนอแนะ</h3>
    <div v-for="state in state" :key="state._id">
      <div class="card mt-3">
        <div class="row">
          <div class="col">
            <h5 class="card-header">{{ state.fileName }}</h5>
          </div>
          <div class="col-2">
            <button
              class="btn btn-danger float-end"
              :value="state.fileUrl"
              @click="deleteFilejob"
            >
              ลบข้อมูล
            </button>
          </div>
        </div>
        <div class="card-body">
          <p class="card-text">ลำดับ : {{ state.fileOrder }}</p>
          <p class="card-text">คำอธิบาย : {{ state.fileDetail }}</p>
          <a :href="'http://localhost:8080/' + state.fileUrl" target="_blank">
            <button class="btn btn-primary">โหลดไฟล์</button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive } from "vue";

import Swal from "sweetalert2";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const jobProps = defineProps({
  idjob2: String,
});

const dataJobwbs = {
  idjob2: jobProps.idjob2,
};

const state = reactive([]);

async function fetchFileJob() {
  try {
    const response = await axios.post("/jobwbs/postjobfileone", dataJobwbs);
    if (!response.data.fileJob.fileJob) {
      // do nothing
    } else {
      state.push(...response.data.fileJob.fileJob);
    }
  } catch (error) {
    Swal.fire({
      title: "เกิดข้อผิดผลาด!",
      text: error,
      icon: "error",
    });
  }
}

fetchFileJob();

async function deleteFilejob(e) {
  const confirm = await Swal.fire({
    title: "คุณต้องการจะลบหัวข้อนี้ใช่ใหม",
    showCancelButton: true,
    confirmButtonText: "ลบข้อมูล",
    cancelButtonText: "ยกเลิก",
  });

  if (confirm.isConfirmed) {
    const dataJobwbs = {
      fileUrl: e.target.value,
    };

    try {
      await axios.post("/jobwbs/deletejobfile", dataJobwbs);
      router.go(0);
    } catch (error) {
      Swal.fire({
        title: "ไม่พบข้อมูล!",
        text: error,
        icon: "error",
      });
    }
  }
}
</script>

<style lang="scss" scoped></style>
