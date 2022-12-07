<template lang="pug">
select(:value="modelValue" @input="$emit('update:modelValue', $event.currentTarget.value)")
  //- Integer Values
  optgroup(label="Integer Values")
    option(value="bigint") Big Integer
    option(value="mediumint") Medium Integer
    option(value="int") Integer
    option(value="smallint") Small Integer
    option(value="tinyint") Tiny Integer

  //- Text Values
  optgroup(label="Text Values")
    option(value="char") Char
    option(value="varchar") Var Char
    option(value="longtext") Long Text
    option(value="mediumtext") Medium Text
    option(value="text") Text
    option(value="tinytext") Tiny Text
    option(value="string") String
    option(value="linestring") Line String
    option(value="multilinestring") Multiple Line String

  //- Decimal Values
  optgroup(label="Decimal Values")
    option(value="decimal") Decimal
    option(value="float") Float
    option(value="double") Double


  //- Datetime Values
  optgroup(label="Datetime Values")
    option(value="date") Date
    option(value="datetime") Datetime
    option(value="timestamp") Timestamp
    option(value="time") Time
    option(value="year") Year


  //- Special Values
  optgroup(label="Special Values")
    option(value="binary") Binary
    option(value="blob") BLOB
    option(value="boolean") Boolean
    option(value="enum") Enum
    option(value="geometry") Geometry
    option(value="geometrycollection") Geometry Collection
    option(value="json") JSON
    option(value="point") Point
    option(value="multipoint") Multiple Point
    option(value="polygon") Polygon
    option(value="multipolygon") Multiple Polygon
    option(value="uuid") UUID
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
