<template lang="pug">
tr
  td
    index-name(v-model="field.name" :columns="columns")
    //-select(v-model="field.name" multiple)
      option(v-for="column in columns" :value="column.name") {{ column.name }}
  td
    index-selector(v-model="field.keyType")
  td
    button.button(type="reset" @click="$emit('remove', dataIndex)")
      svg(width="12" height="16" viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg")
        path(d="M0 3H1.5M12 3H10.5M3.5 3V2.5C3.5 1.67157 4.17157 1 5 1H7C7.82843 1 8.5 1.67157 8.5 2.5V3M3.5 3H8.5M3.5 3H1.5M8.5 3H10.5M10.5 3V13.5C10.5 14.3284 9.82843 15 9 15H3C2.17157 15 1.5 14.3284 1.5 13.5V3M4.5 6.5V10.5M7.5 6.5V10.5")
</template>


<script>
import IndexName from "./index-name"
import IndexSelector from "./index-selector"

export default {
  components: {
    IndexName,
    IndexSelector,
  },
  props: {
    field: Object,
    columns: Array,
  },
  emits: [
    "remove",
  ],
}
</script>
