/* eslint-disable node/no-missing-import */
import { createApp } from "vue";
import App from "./App.vue";
import { AppState } from "./composables/AppState";
import { router } from "./router";
import { ProviderState } from "vue-ethers";
import "./assets/styles/main.css";
// eslint-disable-next-line node/no-unpublished-import
import "animate.css";

createApp(App).use(router)
.provide("AppState", AppState)
.provide("ProviderState", ProviderState)
.mount("#app");
