<template lang="pug">
header.controls
  button.button.is-primary(@click="$emit('save')") Save
</template>

<script>
export default {
  emits: [
    "save",
  ],
}
</script>
