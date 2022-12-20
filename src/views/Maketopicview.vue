<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <ListData :job="job" :BaName="jobwbsLocation" />
      </div>
      <div class="col">
        <h3 class="mt-3">
          สร้างขั้นตอนลำดับสถานะงาน {{ job }} ของ
          {{ decoded.dataUser.DepartmentFullName }}
          {{ decoded.dataUser.BaName }}
        </h3>
        <div class="card mt-3">
          <div class="card-header">สร้างขั้นตอนการทำของ สถานะงาน {{ job }}</div>
          <div class="card-body">
            <div class="row mt-3">
              <div class="col-2">
                <div class="fw-bold">ชื่อขั้นตอนสถานะงาน {{ job }}</div>
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="กรอกชื่อขั้นตอนสถานะงาน"
                  v-model="jobwbsName"
                />
              </div>
              <div class="col">
                <button
                  type="button"
                  class="btn btn-success"
                  @click="postJobwbs"
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-2">
                <div class="fw-bold">คำอธิบาย</div>
              </div>
              <div class="col">
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="กรอกคำอธิบายของขั้นตอนนี้"
                  v-model="jobwbsExplain"
                ></textarea>
              </div>
              <div class="col"></div>
            </div>
            <div class="row mt-3">
              <div class="col-2">
                <div class="fw-bold">คำเตือน</div>
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  id=""
                  placeholder="กรอกคำเตือน ให้ระวังในการทำงาน"
                  v-model="jobwbsWarning"
                />
              </div>
              <div class="col"></div>
            </div>
            <div class="row mt-3">
              <div class="col-2">
                <div class="fw-bold">ยืนยันเปลี่ยนสถานะงานต่อไป</div>
              </div>
              <div class="col">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions2"
                    id="inlineRadio1"
                    value="false"
                    checked
                    v-model="jobwbsNextstep"
                  />
                  <label class="form-check-label" for="inlineRadio1"
                    >ไม่ใช่</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions2"
                    id="inlineRadio2"
                    value="true"
                    v-model="jobwbsNextstep"
                  />
                  <label class="form-check-label" for="inlineRadio2">ใช่</label>
                </div>
              </div>
              <div class="col"></div>
            </div>
            <div class="row mt-3">
              <div class="col-2">
                <div class="fw-bold">ลำดับ</div>
              </div>
              <div class="col">
                <input
                  type="number"
                  class="form-control"
                  v-model="jobwbsOrder"
                />
              </div>
              <div class="col"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useStore } from "vuex";
import jwt_decode from "jwt-decode";
import { useRoute, useRouter } from "vue-router";

import Swal from "sweetalert2";

import ListData from "../components/Maketopic/ListData.vue";

const store = useStore();
store.commit("initializeStore");
const access = store.state.access;
const decoded = jwt_decode(access);

const route = useRoute();
const router = useRouter();
const job = route.query.job;

const jobwbsName = ref("");
const jobwbsExplain = ref("");
const jobwbsWarning = ref("");
const jobwbsOrder = ref(1);
const jobwbsNextstep = ref("false");
const jobwbsLocation = decoded.dataUser.BaName;

function postJobwbs() {
  if (jobwbsName.value === "" || jobwbsExplain.value === "") {
    Swal.fire({
      title: "เกิดข้อผิดผลาด!",
      text: "กรอกชื่อมูลให้ครบถ้วน",
      icon: "error",
    });
  } else {
    const dataJobwbs = {
      jobwbsName: jobwbsName.value,
      jobwbsStatus: job,
      jobwbsExplain: jobwbsExplain.value,
      jobwbsWarning: jobwbsWarning.value,
      jobwbsNextstep: jobwbsNextstep.value,
      jobwbsLocation: jobwbsLocation,
      jobwbsOrder: jobwbsOrder.value,
    };
    axios
      .post("/jobwbs/post", dataJobwbs)
      .then((response) => {
        // console.log(response);
        router.go(0);
      })
      .catch((error) => {
        Swal.fire({
          title: "เกิดข้อผิดผลาด!",
          text: "หมายเลขหัวข้อนี้ " + jobwbsName.value + " มีในระบบแล้ว",
          icon: "error",
        });
      });
  }
}
</script>

<style lang="scss" scoped></style>
