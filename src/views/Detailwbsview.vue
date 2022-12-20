<template>
  <div class="container">
    <!-- Section: Timeline -->
    <section class="py-5">
      <ul class="timeline-with-icons">
        <li class="timeline-item mb-5">
          <span class="timeline-icon">
            <i class="fas fa-rocket text-primary fa-sm fa-fw"></i>
          </span>

          <div class="row">
            <div class="col-2">
              <h5 class="">สถานะ A0</h5>
            </div>
            <div class="col">
              <router-link
                :to="{
                  name: 'maketopicview',
                  query: { job: 'A0' },
                }"
              >
                <button type="button" class="btn btn-success float-end">
                  สร้างหัวข้อขั้นงานในสถานะ A0
                </button>
              </router-link>
            </div>
          </div>

          <A0 :BaName="jobwbsLocation" job="A0" />
        </li>

        <li class="timeline-item mb-5">
          <span class="timeline-icon">
            <i class="fas fa-hand-holding-usd text-primary fa-sm fa-fw"></i>
          </span>
          <div class="row">
            <div class="col-2">
              <h5 class="">สถานะ C1</h5>
            </div>
            <div class="col">
              <router-link
                :to="{
                  name: 'maketopicview',
                  query: { job: 'C1' },
                }"
              >
                <button type="button" class="btn btn-success float-end">
                  สร้างหัวข้อขั้นงานในสถานะ C1
                </button>
              </router-link>
            </div>
          </div>
          <A0 :BaName="jobwbsLocation" job="C1" />
        </li>

        <li class="timeline-item mb-5">
          <span class="timeline-icon">
            <i class="fas fa-users text-primary fa-sm fa-fw"></i>
          </span>
          <div class="row">
            <div class="col-2">
              <h5 class="">สถานะ D1</h5>
            </div>
            <div class="col">
              <router-link
                :to="{
                  name: 'maketopicview',
                  query: { job: 'D1' },
                }"
              >
                <button type="button" class="btn btn-success float-end">
                  สร้างหัวข้อขั้นงานในสถานะ D1
                </button>
              </router-link>
            </div>
          </div>
          <A0 :BaName="jobwbsLocation" job="D1" />
        </li>

        <li class="timeline-item mb-5">
          <span class="timeline-icon">
            <i class="fas fa-money-bill-wave text-primary fa-sm fa-fw"></i>
          </span>
          <div class="row">
            <div class="col-2">
              <h5 class="">สถานะ D2</h5>
            </div>
            <div class="col">
              <router-link
                :to="{
                  name: 'maketopicview',
                  query: { job: 'D2' },
                }"
              >
                <button type="button" class="btn btn-success float-end">
                  สร้างหัวข้อขั้นงานในสถานะ D2
                </button>
              </router-link>
            </div>
          </div>
          <A0 :BaName="jobwbsLocation" job="D2" />
        </li>

        <li class="timeline-item mb-5">
          <span class="timeline-icon">
            <i class="fas fa-money-bill-wave text-primary fa-sm fa-fw"></i>
          </span>
          <div class="row">
            <div class="col-2">
              <h5 class="">สถานะ F4</h5>
            </div>
            <div class="col">
              <router-link
                :to="{
                  name: 'maketopicview',
                  query: { job: 'F4' },
                }"
              >
                <button type="button" class="btn btn-success float-end">
                  สร้างหัวข้อขั้นงานในสถานะ F4
                </button>
              </router-link>
            </div>
          </div>
          <A0 :BaName="jobwbsLocation" job="F4" />
        </li>
      </ul>
    </section>
    <!-- Section: Timeline -->
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useStore } from "vuex";
import jwt_decode from "jwt-decode";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

import A0 from "../components/A0/ListData.vue";

const store = useStore();
store.commit("initializeStore");
const access = store.state.access;
const decoded = jwt_decode(access);

const route = useRoute();
const id = route.query.id;

const jobwbsLocation = decoded.dataUser.BaName;
</script>

<style scoped>
.timeline-with-icons {
  border-left: 1px solid hsl(0, 0%, 90%);
  position: relative;
  list-style: none;
}

.timeline-with-icons .timeline-item {
  position: relative;
}

.timeline-with-icons .timeline-item:after {
  position: absolute;
  display: block;
  top: 0;
}

.timeline-with-icons .timeline-icon {
  position: absolute;
  left: -48px;
  background-color: hsl(217, 88.2%, 90%);
  color: hsl(217, 88.8%, 35.1%);
  border-radius: 50%;
  height: 31px;
  width: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
