const { widget } = figma
const {
  // Components
  AutoLayout,
  Text,
} = widget

export interface Column {
  name: string
  type: string
  nullable: boolean
  keyType:
  | "primary"
  | "unique"
  | "index"
  | "normal"
  | "foreign"
}

interface KeyDecorator {
  icon: string
  color:
  | HexCode
  | WidgetJSX.Color
  | WidgetJSX.Paint
  | (WidgetJSX.SolidPaint | WidgetJSX.GradientPaint)[]
}

function getKeyDecorator(column: Column): KeyDecorator {
  return {
    "primary": {
      icon: "key",
      color: "#ffdd57",
    },
    "foreign": {
      icon: "link",
      color: "#9747ff",
    },
    "unique": {
      icon: "snowflake",
      color: "#249beb",
    },
    "index": {
      icon: "thumbtack",
      color: "#48c774",
    },
    "normal": {
      icon: "",
      color: "#00000000",
    },
  }[column.keyType]
}

export function KeyColumn(props) {
  const { column } = props
  const { icon, color } = getKeyDecorator(column)

  return (
    (
      <AutoLayout
        width={400}
        height={48}
        padding={{
          right: 16,
        }}
        stroke="#e6e6e6"
        fill="#ffffff"
        verticalAlignItems="center"
        horizontalAlignItems="center"
      >
        <Text
          width={32}
          height={32}
          fontSize={18}
          fontFamily="Font Awesome 5 Free"
          fontWeight={900}
          fill={color}
          verticalAlignText="center"
          horizontalAlignText="center"
        >
          {icon}
        </Text>
        <Text
          width="fill-parent"
          fontFamily="Roboto Mono"
          fontSize={18}
        >
          {column.name}
        </Text>
        <Text
          fontFamily="Roboto Mono"
          fontSize={18}
        >
          {column.type}{column.nullable ? "?" : ""}
        </Text>
      </AutoLayout>
    )
  )
}

export default KeyColumn
