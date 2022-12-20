<template>
  <div class="container">
    <div class="card mt-3">
      <div class="card-header">กำหนดราคากลาง</div>
      <div class="card-body">
        <h5 class="card-title">สูตรคำนวน</h5>
        <div class="row">
          <div class="col-auto">
            <label for="inputCode10" class="col-form-label"
              >รหัส 10 หลักจากประมาณการ</label
            >
          </div>
          <div class="col-8">
            <multiselect
              v-model="codeNumber"
              :options="options"
              :custom-label="nameWithLang"
              placeholder="Select one"
              label="itemDescription"
              track-by="itemDescription"
            />
          </div>
          <div class="col-auto">
            <span id="passwordHelpInline" class="form-text">
              กรอกรหัส 10 จากประมาณการ
            </span>
          </div>
        </div>
        <div class="mt-3">
          {{ codeNumber.codeNumber }} | {{ codeNumber.nameHardware }}
        </div>
        <div class="row mt-3">
          <div class="col">
            <div class="form-check-label">
              <label for="inlineRadio1" class="col-form-label"
                >แผนกที่ก่อสร้าง &nbsp;
              </label>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="check1"
                  id="inlineRadio1"
                  value="option1"
                  checked
                />
                <label class="form-check-label" for="inlineRadio1"
                  >แผนกแรงสูง</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="check1"
                  id="inlineRadio2"
                  value="option2"
                />
                <label class="form-check-label" for="inlineRadio2"
                  >แผนกหม้อแปลง</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="check1"
                  id="inlineRadio3"
                  value="option3"
                />
                <label class="form-check-label" for="inlineRadio3"
                  >แผนกแรงต่ำ</label
                >
              </div>
            </div>
          </div>
          <div class="col">
            <div class="form-check-label">
              <label for="inlineRadio1" class="col-form-label"
                >ชนิดงาน &nbsp;
              </label>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="check2"
                  id="inlineRadio1"
                  value="option1"
                  checked
                />
                <label class="form-check-label" for="inlineRadio1"
                  >ติดตั้งใหม่</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="check2"
                  id="inlineRadio2"
                  value="option2"
                />
                <label class="form-check-label" for="inlineRadio2"
                  >รื้อถอน</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="check2"
                  id="inlineRadio3"
                  value="option3"
                />
                <label class="form-check-label" for="inlineRadio3"
                  >นำกลับมาใช้ใหม่</label
                >
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <div class="row">
              <label for="inputPassword2" class="col-form-label"
                >ปริมาณงาน</label
              >
            </div>
            <div class="row">
              <div class="col-10">
                <input type="number" class="form-control" id="inputPassword2" />
              </div>
              <label for="inputPassword2" class="col-2 col-form-label">{{
                codeNumber.unit
              }}</label>
            </div>
          </div>
          <div class="col">
            <div class="row">
              <label for="inputPassword" class="col-form-label"
                >ค่าแรงจากโปรแกรมประมาณการ</label
              >
            </div>
            <div class="row">
              <div class="col-10">
                <input type="number" class="form-control" id="inputPassword" />
              </div>
              <label for="inputPassword" class="col-2 col-form-label">
                * บาท
              </label>
            </div>
          </div>
          <div class="col">
            <div class="row">
              <label for="inputPassword3" class="col-form-label"
                >ราคากลางจากพี่ยง</label
              >
            </div>
            <div class="row">
              <div class="col-10">
                <input type="number" class="form-control" id="inputPassword3" />
              </div>
              <label for="inputPassword3" class="col-2 col-form-label">
                * เท่า
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

// const state = reactive({
//   hardware: [],
// });

const options = reactive([]);
const codeNumber = ref("");

axios
  .get("/hardware/get")
  .then((response) => {
    options.push(...response.data.hardware);
  })
  .catch((error) => {
    Swal.fire({
      title: "เกิดข้อผิดผลาด!",
      text: "หมายเลข ระบบอาจจะมีปัญหา" + error,
      icon: "error",
    });
  });
</script>

<style scoped></style>
