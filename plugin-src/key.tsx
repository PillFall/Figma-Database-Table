import {
  Column,
} from "./column"

export type KeyType =
  | "primary"
  | "foreign"
  | "unique"
  | "index"

export interface KeyDecorator {
  icon: string
  color:
  | HexCode
  | WidgetJSX.Color
  | WidgetJSX.Paint
  | (WidgetJSX.SolidPaint | WidgetJSX.GradientPaint)[]
}

export function getKeyDecorator(column: Column): KeyDecorator {
  return {
    "primary": {
      icon: "key",
      color: "#FFCD29",
    },
    "foreign": {
      icon: "link",
      color: "#9747FF",
    },
    "unique": {
      icon: "snowflake",
      color: "#0D99FF",
    },
    "index": {
      icon: "thumbtack",
      color: "#48C774",
    },
    "normal": {
      icon: "",
      color: "#00000000",
    },
  }[column.keyType]
}
