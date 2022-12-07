<template lang="pug">
select(:value="modelValue" @input="$emit('update:modelValue', $event.currentTarget.value)")
  option(value="primary") Primary
  option(value="foreign") Foreign
  option(value="unique") Unique
  option(value="index") Simple
  option(value="normal") None
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
  emits: [
    "update:modelValue",
  ],
}
</script>
