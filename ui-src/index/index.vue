<template lang="pug">
controls(@newindex="newIndex" @save="save")
indexes-table(:fields="fields" :columns="columns" @remove="remove" @move="move")
</template>

<script>
import Controls from "./controls"
import IndexesTable from "./indexes-table"

export default {
  components: {
    Controls,
    IndexesTable,
  },
  props: {
    indexes: Array,
    columns: Array,
  },
  data() {
    return {
      fields: this.indexes,
      row: null,
      changedRow: null,
    }
  },
  methods: {
    newIndex() {
      this.fields.push({
        name: [],
        keyType: "index",
      })
    },
    save() {
      parent.postMessage({
        pluginMessage: JSON.stringify({
          action: "indexEdit",
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
