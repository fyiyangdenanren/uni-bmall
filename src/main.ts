import { createSSRApp } from "vue";
import App from "./App.vue";
import "@/common/base.scss"
import pinia from "./stores/user";
export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia);
  return {
    app,
  };
}
