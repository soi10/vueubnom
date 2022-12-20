<template>
  <div class="container">
    <h3 class="mt-3">งาน WBS ปี : {{ access2 }} สถานะ : {{ access3 }}</h3>
    <div class="mt-3">
      <div>
        <vue-good-table
          :columns="columns"
          :rows="state.wbsTables"
          :pagination-options="{
            enabled: true,
            mode: 'records',
            perPage: 10,
            position: 'button',
            perPageDropdown: [10, 20, 50],
            dropdownAllowAll: false,
            setCurrentPage: 1,
            nextLabel: 'next',
            prevLabel: 'prev',
            rowsPerPageLabel: 'Rows per page',
            ofLabel: 'of',
            pageLabel: 'page', // for 'pages' mode
            allLabel: 'All',
            infoFn: (params) => `my own page ${params.firstRecordOnPage}`,
          }"
          :search-options="{
            enabled: true,
          }"
          :line-numbers="true"
          v-on:row-click="onRowClick"
          :sort-options="{
            enabled: true,
            initialSortBy: { field: 'approveNumber', type: 'desc' },
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useStore } from "vuex";
const store = useStore();

store.commit("initializeStore");
const access = store.state.access;

var decoded = jwt_decode(access);
const BaName = decoded.dataUser.BaName;

const router = useRouter();
const route = useRoute();

const access2 = route.query.year;
const access3 = route.query.status;

const formYear = {
  yearWbs: route.query.year,
  BaName: BaName,
  wbsStatus: route.query.status,
};

axios
  .post("/wbs/getwbstables", formYear)
  .then((response) => {
    state.wbsTables = response.data.wbs;
  })
  .catch((error) => {
    Swal.fire({
      title: "เกิดข้อผิดผลาด!",
      text: "หมายเลข ระบบอาจจะมีปัญหา",
      icon: "error",
    });
  });

const state = reactive({
  wbsTables: [],
});

const columns = ref([
  {
    label: "หมายเลข WBS",
    field: "numberWbs",
    type: "text",
  },
  {
    label: "ชื่องานหมายเลข WBS",
    field: "nameWbs",
    type: "text",
  },
  {
    label: "เลขที่อนุมัติ",
    field: "approveNumber",
    type: "text",
    // dateInputFormat: "yyyy-MM-dd",
    // dateOutputFormat: "MMM do yy",
  },
  {
    label: "สถานะงาน",
    field: "wbsStatus",
    type: "text",
    // type: "percentage",
  },
  {
    label: "id",
    field: "_id",
    type: "text",
    hidden: true,
    // type: "percentage",
  },
]);

function onRowClick(params) {
  router.push({ name: "detailwbs", query: { id: params.row._id } });
}
</script>

<style></style>
