import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import App from "@/App.vue";
import "./assets/tailwind.css";
import router from "@/router";

library.add(faSearch);

// this component method will let us call <font-awesome-icon> as a component
createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

// https://test-utils.vuejs.org/guide/advanced/stubs-shallow-mount.html
