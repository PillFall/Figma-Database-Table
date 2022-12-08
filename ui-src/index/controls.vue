<template lang="pug">
header.controls
  button.button(@click="$emit('newindex')") New Index
  button.button.is-primary(@click="$emit('save')") Save
</template>

<script>
export default {
  emits: [
    "newindex",
    "save",
  ],
}
</script>
