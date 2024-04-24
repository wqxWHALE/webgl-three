import { createApp } from "vue";
import App from "./App.vue";
import { validatenull } from "@/utils/validate";
import * as echarts from "echarts";

const app = createApp(App);
app.config.globalProperties.validatenull = validatenull;
app.config.globalProperties.echarts = echarts;
app.mount("#app");
