<template lang="pug">
controls(@save="save")
</template>

<script>
import Controls from "./controls"

export default {
  components: {
    Controls,
  },
  methods: {
    save() {
      try {
        parent.postMessage({
          pluginMessage: JSON.stringify({
            action: "rawEdit",
            data: JSON.parse(window.editor.getValue()),
          }),
        }, "*")
      } catch (exception) {
        let error = document.getElementById("error")
        error.innerHTML = exception.message
        error.classList.add("show")
        setTimeout(() => {
          error.innerHTML = null
          error.classList.remove("show")
        }, 10000)
      }
    },
  },
}
</script>
