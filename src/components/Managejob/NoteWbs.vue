<template>
  <div class="my-1">
    <div v-for="state in state" :key="state.dateAdd">
      <div class="card">
        <h5 class="card-header">โน็ต</h5>
        <div class="card-body">
          <p class="card-text">{{ state.textNote }}</p>
          <p class="card-text">วันที่ : {{ state.dateAdd }}</p>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="card my-1">
      <div class="card-header">โน็ตงาน WBS</div>
      <div class="card-body">
        <h5 class="card-title">บันทึกโน็ต</h5>
        <p class="card-text">
          <textarea class="form-control" rows="3" v-model="textNote"></textarea>
        </p>

        <button class="btn btn-warning" @click="addNote">บันทึกโน็ต</button>
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
const route = useRoute();

const textNote = ref("");
const state = reactive([]);

async function addNote() {
  const result = await Swal.fire({
    title: "คุณต้องบันทึกโน็ตนี้หรือไม่",
    showCancelButton: true,
    confirmButtonText: "ใช่",
    cancelButtonText: "ยกเลิก",
  });

  if (result.isConfirmed) {
    const date = new Date();
    const thaiDate = date.toLocaleString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour12: false,
      timeZone: "Asia/Bangkok",
      timeZoneName: "short",
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
      formatMatcher: "best fit",
      format: "dd/MM/yyyy HH:mm:ss",
    });

    try {
      const response = await axios.post("/wbs/postwbspushnote", {
        idwbs: route.query.idwbs,
        idjob: route.query.idjob,
        textNote: textNote.value,
        thaiDate: thaiDate,
      });
      Swal.fire({
        title: "บันทึกข้อมูลแล้ว",
        text: response.message,
        icon: "success",
      });
      router.go(0);
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดผลาด!",
        text: error,
        icon: "error",
      });
    }
  }
}

async function getNotewbsName() {
  try {
    const response = await axios.post("/wbs/postwbsfetchnote", {
      idwbs: route.query.idwbs,
      idjob: route.query.idjob,
    });

    if (!response.data.wbsfetchnote) {
    } else {
      state.push(...response.data.wbsfetchnote.noteWbs);
    }
  } catch (error) {
    Swal.fire({
      title: "เกิดข้อผิดผลาด!",
      text: error,
      icon: "error",
    });
  }
}
getNotewbsName();
</script>

<style lang="scss" scoped></style>
