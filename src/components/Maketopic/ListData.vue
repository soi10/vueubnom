<template>
  <div class="mt-3">ขั้นตอนและรายละเอียดของงานทั้งหมด</div>
  <div v-for="state in state" :key="state._id">
    <div v-if="state.jobwbsNextstep === 'false'">
      <div class="card my-3">
        <div class="card-header">{{ state.jobwbsName }}</div>
        <div class="card-body">
          <p class="card-text">ลำดับ : {{ state.jobwbsOrder }}</p>
          <p class="card-text">คำอธิบาย : {{ state.jobwbsExplain }}</p>
          <p class="card-text">คำเตือน : {{ state.jobwbsWarning }}</p>
          <span class="badge bg-secondary">ยังอยู่ในสถานะเดิม</span>
          <button
            class="btn btn-danger float-end"
            :value="state._id"
            @click="deleteJobwbs"
          >
            ลบข้อมูล
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="card border-danger my-3">
        <div class="card-header">{{ state.jobwbsName }}</div>
        <div class="card-body">
          <p class="card-text">ลำดับ : {{ state.jobwbsOrder }}</p>
          <p class="card-text">คำอธิบาย : {{ state.jobwbsExplain }}</p>
          <p class="card-text">คำเตือน : {{ state.jobwbsWarning }}</p>
          <span class="badge bg-danger">เปลี่ยนสถานะงาน</span>
          <button
            class="btn btn-danger float-end"
            :value="state._id"
            @click="deleteJobwbs"
          >
            ลบข้อมูล
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const router = useRouter();

const jobProps = defineProps({
  job: String,
  BaName: String,
});

const dataJobwbs = {
  job: jobProps.job,
  BaName: jobProps.BaName,
};

const state = reactive([]);

axios
  .post("/jobwbs/postjobwbs", dataJobwbs)
  .then((response) => {
    // console.log(response);
    state.push(...response.data.jobwbs);
  })
  .catch((error) => {
    Swal.fire({
      title: "เกิดข้อผิดผลาด!",
      text: "หมายเลข WBS " + jobwbsName.value + " มีในระบบแล้ว",
      icon: "error",
    });
  });

function deleteJobwbs(e) {
  Swal.fire({
    title: "คุณต้องการจะลบหัวข้อนี้ใช่ใหม",
    showCancelButton: true,
    confirmButtonText: "ลบข้อมูล",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      const dataJobwbs = {
        jobwbsId: e.target.value,
      };

      axios
        .post("/jobwbs/deletejobwbs", dataJobwbs)
        .then((response) => {
          router.go(0);
        })
        .catch((error) => {
          Swal.fire({
            title: "เกิดข้อผิดผลาด!",
            text: error,
            icon: "error",
          });
        });
    }
  });
}
</script>

<style lang="scss" scoped></style>
