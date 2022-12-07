<template lang="pug">
table
  thead
    tr
      th Name
      th Type
      th Index
      th Nullable
      th
  tbody
    field-row(
      v-for="(field, index) in fields"
      :data-index="index"
      :field="field"
      draggable="true"
      @dragstart="dragStart"
      @dragend="dragEnd"
      @dragover="dragOver"
      @dragleave="dragLeave"
      @remove="$emit('remove', $event)"
    )
</template>

<script>
import FieldRow from "./field-row"

export default {
  components: {
    FieldRow,
  },
  props: {
    fields: Array,
  },
  emits: [
    "remove",
    "move",
  ],
  data() {
    return {
      row: {
        old: null,
        new: null,
      },
    }
  },
  methods: {
    dragStart(event) {
      this.row.old = event.currentTarget.dataset.index
    },
    dragEnd() {
      this.$emit("move", this.row)
    },
    dragOver(event) {
      let overRow = event.currentTarget

      this.row.new = overRow.dataset.index

      let newIndex = this.row.new
      let prevIndex = this.row.old

      let targetClass = ""
      if (newIndex == prevIndex) {
        return
      }

      if (newIndex < prevIndex) {
        targetClass = "has-dragged-top"
      } else {
        targetClass = "has-dragged-bottom"
      }

      overRow.classList.add(targetClass)
    },
    dragLeave(event) {
      let overRow = event.currentTarget

      overRow.classList.remove("has-dragged-bottom", "has-dragged-top")
    },
  },
}
</script>
