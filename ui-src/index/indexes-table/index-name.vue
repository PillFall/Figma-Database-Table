<template lang="pug">
.name-container
  span.tag(v-for="field in modelValue")
    span {{ field }}
    button.delete(@click="deleteIndex(field)")
      svg(width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg")
        path(d="M11 1L1 11M1 1.00008L11 11")

  select.new-index(v-model="newColumn" @change="newIndex")
    option(:value="null" hidden) +
    option(v-for="column in columns" :value="column.name" :disabled="modelValue.indexOf(column.name) != -1") {{ column.name }}
</template>

<script>
export default {
  props: {
    modelValue: Array,
    columns: Array,
  },
  emits: [
    "update:modelValue",
  ],
  data() {
    return {
      newColumn: null,
    }
  },
  methods: {
    newIndex(event) {
      this.$emit("update:modelValue", [
        ...this.modelValue,
        event.currentTarget.value,
      ])
      this.newColumn = null
    },
    deleteIndex(field) {
      let newModel = this.modelValue
      let index = newModel.indexOf(field)
      newModel.splice(index, 1)

      return this.$emit("update:modelValue", newModel)
    },
  },
}
</script>
