<template>
  <div class="my-3">
    <div v-for="state in state" :key="state._id">
      <div class="card">
        <h5 class="card-header">
          {{ state.jobwbsStatus }} : {{ state.jobwbsName }}
        </h5>
        <div class="card-body">
          <p class="card-text">ลำดับ : {{ state.jobwbsOrder }}</p>
          <p class="card-text">คำอธิบาย : {{ state.jobwbsExplain }}</p>
          <p class="card-text">คำเตือน : {{ state.jobwbsWarning }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive } from "vue";
import Swal from "sweetalert2";

const jobProps = defineProps({
  idjob2: String,
});

const dataJobwbs = {
  idjob2: jobProps.idjob2,
};

const state = reactive([]);

async function getJobwbsName() {
  try {
    const response = await axios.post("/jobwbs/postjobwbsname", dataJobwbs);
    if (!response.data.jobwbs) {
    } else {
      state.push(response.data.jobwbs);
    }
  } catch (error) {
    Swal.fire({
      title: "เกิดข้อผิดผลาด!",
      text: error,
      icon: "error",
    });
  }
}
getJobwbsName();
</script>

<style lang="scss" scoped></style>
