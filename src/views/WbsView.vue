<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col"><h3>ปริมาณงานทั้งหมดที่ ผปบ.อบ. ได้รับมอบหมาย</h3></div>
      <div class="col">
        <router-link to="/createwbs">
          <button type="button" class="btn btn-success float-end">
            สร้างหมายเลขงาน WBS สถานะ A0
          </button>
        </router-link>
      </div>
    </div>
    <div class="form-floating mt-3">
      <select
        class="form-select"
        aria-label="Default select example"
        id="floatingYear"
        v-model="yearWbs"
        @change="onChange($event)"
      >
        <option value="2566" selected>2566</option>
        <option value="2567">2567</option>
        <option value="2568">2568</option>
        <option value="2569">2569</option>
      </select>
      <label for="floatingYear">ปีของหมาย WBS</label>
    </div>
    <div class="card mt-3" v-for="countWbs in state" :key="countWbs.year">
      <div class="card-header">งานปี : {{ countWbs.year }}</div>
      <div class="card-body">
        <table class="table table-bordered text-center">
          <thead class="table-light">
            <tr>
              <th scope="col">จำนวนงานทั้งหมด</th>
              <th scope="col">A0</th>
              <th scope="col">C1</th>
              <th scope="col">D1</th>
              <th scope="col">D2</th>
              <th scope="col">F4</th>
              <th scope="col">%</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <router-link
                  :to="{
                    name: 'tableswbs',
                    query: { year: countWbs.year, status: 'ALL' },
                  }"
                >
                  {{
                    countWbs.A0 +
                    countWbs.C1 +
                    countWbs.D1 +
                    countWbs.D2 +
                    countWbs.F4
                  }}
                </router-link>
              </th>
              <td>
                <router-link
                  :to="{
                    name: 'tableswbs',
                    query: {
                      year: countWbs.year,
                      status: 'A0',
                    },
                  }"
                  >{{ countWbs.A0 }}</router-link
                >
              </td>
              <td>
                <router-link
                  :to="{
                    name: 'tableswbs',
                    query: {
                      year: countWbs.year,
                      status: 'C1',
                    },
                  }"
                  >{{ countWbs.C1 }}</router-link
                >
              </td>
              <td>
                <router-link
                  :to="{
                    name: 'tableswbs',
                    query: {
                      year: countWbs.year,
                      status: 'D1',
                    },
                  }"
                  >{{ countWbs.D1 }}</router-link
                >
              </td>
              <td>
                <router-link
                  :to="{
                    name: 'tableswbs',
                    query: {
                      year: countWbs.year,
                      status: 'D2',
                    },
                  }"
                  >{{ countWbs.D2 }}</router-link
                >
              </td>
              <td>
                <router-link
                  :to="{
                    name: 'tableswbs',
                    query: {
                      year: countWbs.year,
                      status: 'F4',
                    },
                  }"
                  >{{ countWbs.F4 }}</router-link
                >
              </td>
              <td>{{ countWbs.percent }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import { useStore } from "vuex";
const store = useStore();

store.commit("initializeStore");
const access = store.state.access;
var decoded = jwt_decode(access);
const BaName = decoded.dataUser.BaName;

const state = reactive([]);

const yearWbs = ref("2566");

const formYear = {
  yearWbs: yearWbs.value,
  BaName: BaName,
};

async function getWbsCounts() {
  try {
    const response = await axios.post("/wbs/getwbscounts", formYear);
    state.push(...response.data.wbs);
  } catch (error) {
    Swal.fire({
      title: "เกิดข้อผิดผลาด!",
      text: error,
      icon: "error",
    });
  }
}

getWbsCounts();

async function onChange(event) {
  const formYear = {
    yearWbs: event.target.value,
    BaName: BaName,
  };

  state.length = 0;

  try {
    const response = await axios.post("/wbs/getwbscounts", formYear);
    state.push(...response.data.wbs);
  } catch (error) {
    Swal.fire({
      title: "เกิดข้อผิดผลาด!",
      text: "หมายเลข ระบบอาจจะมีปัญหา",
      icon: "error",
    });
  }
}
</script>
