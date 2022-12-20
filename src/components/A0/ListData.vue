<template>
  <div v-for="state in states" :key="state._id">
    <div class="card my-3">
      <div class="card-header">{{ state.jobwbsName }}</div>
      <div class="card-body">
        <p class="card-text">ลำดับ : {{ state.jobwbsOrder }}</p>
        <p class="card-text">คำอธิบาย : {{ state.jobwbsExplain }}</p>
        <p class="card-text">คำเตือน : {{ state.jobwbsWarning }}</p>

        <div class="row">
          <div class="col">
            <div v-if="state.jobwbsNextstep === 'false'">
              <span class="badge bg-secondary">ยังอยู่ในสถานะเดิม</span>
            </div>
            <div v-else>
              <span class="badge bg-danger">เปลี่ยนสถานะงาน</span>
            </div>
          </div>
          <div class="col">
            <div v-for="(stateidWbs, i) in stateidWbss" :key="i">
              <div v-for="(idJob, j) in stateidWbs" :key="j">
                <div v-if="idJob.idJob == state._id">
                  <h5><span class="badge bg-success">ดำเนินการแล้ว</span></h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <router-link
          :to="{
            name: 'managejobview',
            query: { idjob: state._id, idwbs: id },
          }"
        >
          <button type="button" class="btn btn-primary float-end">
            วิธีทำ / บันทึกข้อมูล
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive } from "vue";
import Swal from "sweetalert2";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const id = route.query.id;

const jobProps = defineProps({
  BaName: String,
  job: String,
});

const dataJobwbs = {
  job: jobProps.job,
  BaName: jobProps.BaName,
};

const states = reactive([]);
const stateidWbss = reactive([]);

const postId = {
  idwbs: id,
};

async function postJobwbs() {
  try {
    const response = await axios.post("/jobwbs/postjobwbs", dataJobwbs);
    states.push(...response.data.jobwbs);
    const response2 = await axios.post("/wbs/postwbsjobupdate", postId);
    // console.log(response2.data.wbsjobupdate);
    stateidWbss.push(response2.data.wbsjobupdate.jobWbsdone);
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "เกิดข้อผิดผลาด!",
      text: error,
      icon: "error",
    });
  }
}

postJobwbs();
</script>

<style lang="scss" scoped></style>
