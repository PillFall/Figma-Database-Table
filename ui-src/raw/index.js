import { createApp } from "vue"
import App from "./index.vue"

addEventListener("message", (event) => {
  const app = createApp(App)
  app.mount("nav")

  let data = JSON.stringify(event.data.pluginMessage, null, 2)
  window.editor.setValue(data)
})
