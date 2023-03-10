import { createApp } from "vue";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from "@formkit/vue";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import axios from "axios";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(plugin, defaultConfig);
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json";
app.mount("#app");
