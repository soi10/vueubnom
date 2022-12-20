import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueGoodTablePlugin from "vue-good-table-next";
import "vue-good-table-next/dist/vue-good-table-next.css";
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";

axios.defaults.baseURL = "http://localhost:8080/";

const app = createApp(App);
app.component("multiselect", VueMultiselect);
app.use(store);
app.use(router);
app.use(VueGoodTablePlugin);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
