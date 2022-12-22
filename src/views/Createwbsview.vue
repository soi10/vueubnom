<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <div class="card">
          <h5 class="card-header">คู่มือ / วิธีทำ / เอกสาร</h5>
          <div class="card-body">
            <p class="card-text">coming soon ...</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <h5 class="card-header">ข้อมูลหมายเลข WBS</h5>
          <div class="card-body">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingWbs"
                placeholder="กรอกหมายเลข WBS"
                v-model="numberWbs"
              />
              <label for="floatingWbs">กรอกแฟ้มงานหมายเลข WBS</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingApp"
                placeholder="text"
                v-model="nameWbs"
              />
              <label for="floatingApp">กรอกชื่องานหมายเลข WBS</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingnumber"
                placeholder="text"
                v-model="approveNumber"
              />
              <label for="floatingnumber">กรอกเลขที่อนุมัติ</label>
            </div>
            <div class="form-floating mb-3">
              <select
                class="form-select"
                aria-label="Default select example"
                id="floatingYear"
                v-model="yearWbs"
              >
                <option selected>เลือกปีของหมาย WBS</option>
                <option value="2566">2566</option>
                <option value="2567">2567</option>
                <option value="2568">2568</option>
                <option value="2569">2569</option>
              </select>
              <label for="floatingYear">ปีของหมาย WBS</label>
            </div>
            <div class="form-floating mb-3">
              <button
                type="button"
                class="btn btn-success"
                @click="postDatawbs"
              >
                บันทึกข้อมูลงาน WBS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
const store = useStore();
const router = useRouter();

store.commit("initializeStore");
const access = store.state.access;

const decoded = jwt_decode(access);
const numberWbs = ref("");
const nameWbs = ref("");
const approveNumber = ref("");
const yearWbs = ref("เลือกปีของหมาย WBS");

function postDatawbs() {
  if (
    numberWbs.value === "" ||
    nameWbs.value === "" ||
    approveNumber.value === "" ||
    yearWbs.value === "เลือกปีของหมาย WBS"
  ) {
    Swal.fire({
      title: "เกิดข้อผิดผลาด!",
      text: "กรอกชื่อมูลให้ครบถ้วน",
      icon: "error",
    });
  } else {
    const dataWbs = {
      numberWbs: numberWbs.value,
      nameWbs: nameWbs.value,
      approveNumber: approveNumber.value,
      yearWbs: yearWbs.value,
      BaCode: decoded.dataUser.BaCode,
      BaName: decoded.dataUser.BaName,
      CostCenterName: decoded.dataUser.CostCenterName,
      DepartmentFullName: decoded.dataUser.DepartmentFullName,
      DepartmentShortName: decoded.dataUser.DepartmentShortName,
      EmployeeId: decoded.dataUser.EmployeeId,
      FullName: decoded.dataUser.FullName,
      Position: decoded.dataUser.Position,
    };

    axios
      .post("/wbs/post", dataWbs)
      .then((response) => {
        router.go(-1);
      })
      .catch((error) => {
        Swal.fire({
          title: "เกิดข้อผิดผลาด!",
          text: "หมายเลข WBS " + numberWbs.value + " มีในระบบแล้ว",
          icon: "error",
        });
      });
  }
}
</script>
