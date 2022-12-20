<template>
  <div class="container mt-3">
    <NameJob :idjob2="idjob2" />
    <div class="row">
      <div class="col">
        <div v-for="wbs in wbs" :key="wbs._id">
          <div class="card">
            <div class="card-header">ดำเนินการ</div>
            <div class="card-body">
              <h5 class="card-title">หมายเลข wbs : {{ wbs.numberWbs }}</h5>
              <p class="card-text">ชื่องาน : {{ wbs.nameWbs }}</p>
              <p class="card-text">เลขที่อุนมัติ : {{ wbs.approveNumber }}</p>
              <p ref="wbsStatus" class="card-text">
                สถานงานปัจจุบัน : {{ wbs.wbsStatus }}
              </p>
              <button class="btn btn-success" @click="worker">
                ยืนยันว่าทำขั้นตอนนี้แล้ว
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <ListFile :idjob2="idjob2" />

        <form @submit.prevent="submitForm">
          <div class="card">
            <div class="card-header">คู่มือ / เอกสาร / ข้อเสนอแนะ</div>
            <div class="card-body">
              <h5 class="card-title">อัพโหลดคู่มือ เอกสาร หรือข้อเสนอแนะ</h5>
              <div class="mb-3">
                <label class="form-label"
                  >ชื่อคู่มือ เอกสาร หรือข้อเสนอแนะ</label
                >
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  v-model="fileName"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">กรอกรายละเอียด</label>
                <textarea
                  class="form-control"
                  rows="3"
                  v-model="fileDetail"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="formFile" class="form-label">แนบไฟล์</label>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  ref="file"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">ลำดับ</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder=""
                  v-model="fileOrder"
                />
              </div>
              <button type="submit" class="btn btn-primary">บันทึก</button>
              <div class="mt-3" v-show="loading">
                <div class="spinner-border text-success" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-border text-danger" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-border text-warning" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-border text-info" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive } from "vue";
import Swal from "sweetalert2";
import { useRouter, useRoute } from "vue-router";

import ListFile from "../components/Managejob/ListFile.vue";
import NameJob from "../components/Managejob/NameJob.vue";

const route = useRoute();
const router = useRouter();
const idjob = route.query.idjob;
const idwbs = route.query.idwbs;

const wbs = reactive([]);
const job = reactive([]);

const fileName = ref("");
const fileDetail = ref("");
const file = ref(null);
const fileOrder = ref(1);
const loading = ref(false);

const idjob2 = ref(route.query.idjob);

const dataidwbs = {
  idwbs: idwbs,
};

axios
  .post("/wbs/getwbsone", dataidwbs)
  .then((response) => {
    // console.log(response);
    if (!response.data.wbs) {
    } else {
      wbs.push(response.data.wbs);
    }
  })
  .catch((error) => {
    console.log(error);
    Swal.fire({
      title: "เกิดข้อผิดผลาด!",
      text: error,
      icon: "error",
    });
  });

function submitForm() {
  loading.value = true;
  const data = new FormData();
  data.append("fileUrl", file.value.files[0]);
  data.append("fileName", fileName.value);
  data.append("fileDetail", fileDetail.value);
  data.append("fileOrder", fileOrder.value);
  data.append("idJobwbs", idjob);

  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  axios
    .post("/jobwbs/uploadjobfile", data, config)
    .then((response) => {
      loading.value = false;
      Swal.fire({
        title: "",
        text: "สำเร็จ",
        icon: "success",
      });
      router.go(0);
    })
    .catch((error) => {
      // console.log(error);
      Swal.fire({
        title: "เกิดข้อผิดผลาด!",
        text: error,
        icon: "error",
      });
    });
}

function worker() {
  Swal.fire({
    title: "คุณต้องการจะบันทึกว่าดำเดินการหัวข้อนี้แล้ว",
    showCancelButton: true,
    confirmButtonText: "ใช่",
    cancelButtonText: "ยกเลิก",
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      try {
        const response = await axios.post("/wbs/postwbsjobdone", {
          idwbs: route.query.idwbs,
          idJob: route.query.idjob,
          jobStatus: wbs[0].wbsStatus,
        });
        Swal.fire({
          title: "บันทึกข้อมูลแล้ว",
          text: response.message,
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดผลาด!",
          text: error,
          icon: "error",
        });
      }
    }
  });
}
</script>

<style lang="scss" scoped></style>
