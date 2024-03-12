import { createApp } from "vue";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from "@formkit/vue";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faAngleLeft,
  faAnglesLeft,
  faAngleRight,
  faAnglesRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faAngleLeft,
  faAnglesLeft,
  faAngleRight,
  faAnglesRight,
  faCircleXmark
);

const app = createApp(App);

app.component("FontAwesomeIcon", FontAwesomeIcon);
app.use(createPinia());
app.use(router);
app.use(plugin, defaultConfig);
axios.defaults.baseURL = "https://ruirusportiffacademy.com/tinker/api";
axios.defaults.headers.post["Content-Type"] = "application/json";
app.mount("#app");
