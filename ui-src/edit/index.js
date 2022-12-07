import { createApp } from "vue"
import App from "./index.vue"

addEventListener("message", (event) => {
  const app = createApp(App, {
    columns: event.data.pluginMessage,
  })
  app.mount("body")
})
