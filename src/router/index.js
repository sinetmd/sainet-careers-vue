import { createRouter, createWebHashHistory } from "vue-router";

// use lazy loading -> load files when we really need them
// ex: if we are navigating to home view then we are only importing homeview file and the other two files are not loaded
const HomeView = () => import("@/views/HomeView.vue");
const JobResultsView = () =>
  import(/* webpackChunkName: "jobs"*/ "@/views/JobResultsView.vue");
const JobView = () =>
  import(/* webpackChunkName: "jobs"*/ "@/views/JobView.vue");

const routes = [
  {
    path: "/",
    name: "Home", // unique identifier for this route
    component: HomeView,
  },
  {
    path: "/jobs/results",
    name: "JobResults",
    component: JobResultsView,
  },
  {
    path: "/jobs/results/:id",
    name: "JobListing",
    component: JobView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // how router will behave in regards to scrolling
  // whenever is a change in route
  scrollBehavior() {
    return {
      // top of the page
      top: 0,
      left: 0,
      behavior: "smooth",
    };
  },
});

export default router;
