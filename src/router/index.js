import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import WbsView from "../views/WbsView.vue";
import TableswbsView from "../views/TableswbsView.vue";
import Createwbsview from "../views/Createwbsview.vue";
import Detailwbsview from "../views/Detailwbsview.vue";
import Maketopicview from "../views/Maketopicview.vue";
import Managejobview from "../views/Managejobview.vue";
import Genmiddleprice from "../views/Genmiddleprice/Genmiddleprice.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/wbs",
      name: "wbs",
      component: WbsView,
    },
    {
      path: "/tableswbs",
      name: "tableswbs",
      component: TableswbsView,
    },
    {
      path: "/createwbs",
      name: "createwbs",
      component: Createwbsview,
    },
    {
      path: "/detailwbs",
      name: "detailwbs",
      component: Detailwbsview,
    },
    {
      path: "/maketopicview",
      name: "maketopicview",
      component: Maketopicview,
    },
    {
      path: "/managejobview",
      name: "managejobview",
      component: Managejobview,
    },
    {
      path: "/genmiddleprice",
      name: "genmiddleprice",
      component: Genmiddleprice,
    },
  ],
});

export default router;
