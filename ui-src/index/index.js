import { createApp } from "vue"
import App from "./index.vue"

addEventListener("message", (event) => {
  const app = createApp(App, {
    indexes: event.data.pluginMessage.indexes,
    columns: event.data.pluginMessage.columns,
  })
  app.mount("body")
})
