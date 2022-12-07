<template lang="pug">
controls(@newcolumn="newColumn" @save="save")
fields-table(:fields="fields" @remove="remove" @move="move")
</template>

<script>
import Controls from "./controls"
import FieldsTable from "./fields-table"

export default {
  components: {
    Controls,
    FieldsTable,
  },
  props: {
    columns: Array,
  },
  data() {
    return {
      fields: this.columns,
      row: null,
      changedRow: null,
    }
  },
  methods: {
    newColumn() {
      this.fields.push({
        name: null,
        type: "int",
        keyType: "normal",
        nullable: false,
      })
    },
    save() {
      parent.postMessage({
        pluginMessage: JSON.stringify({
          action: "edit",
          data: this.fields,
        }),
      }, "*")
    },
    remove(index) {
      this.fields.splice(index, 1)
    },
    move(row) {
      let currentColumn = this.fields.splice(row.old, 1)
      this.fields.splice(row.new, 0, currentColumn[0])
    },
  },
}
</script>
