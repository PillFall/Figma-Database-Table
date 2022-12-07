<template lang="pug">
header.controls
  button.button(@click="$emit('newcolumn')") New Column
  button.button.is-primary(@click="$emit('save')") Save
</template>

<script>
export default {
  emits: [
    "newcolumn",
    "save",
  ],
}
</script>
