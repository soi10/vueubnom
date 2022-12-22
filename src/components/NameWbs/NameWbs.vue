<template>
  <div v-for="wbs in wbs" :key="wbs._id">
    <div class="card mt-2">
      <div class="card-header">ดำเนินการ</div>
      <div class="card-body">
        <h5 class="card-title">หมายเลข wbs : {{ wbs.numberWbs }}</h5>
        <p class="card-text">ชื่องาน : {{ wbs.nameWbs }}</p>
        <p class="card-text">เลขที่อุนมัติ : {{ wbs.approveNumber }}</p>
        <p ref="wbsStatus" class="card-text">
          สถานงานปัจจุบัน : {{ wbs.wbsStatus }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive } from "vue";
import Swal from "sweetalert2";

const wbs = reactive([]);

const wbsProps = defineProps({
  idwbs: String,
});

const dataidwbs = {
  idwbs: wbsProps.idwbs,
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
</script>

<style lang="scss" scoped></style>
