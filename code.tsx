const { widget } = figma
const {
  // Components
  AutoLayout,
  Frame,
  Input,
  Rectangle,
  Text,

  // Hooks
  useEffect,
  usePropertyMenu,
  useSyncedState,

  // Funtions
  register,
} = widget

interface Column {
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

const colors = [
  { option: "#1e1e1e", tooltip: "Black" },
  { option: "#b3b3b3", tooltip: "Gray" },
  { option: "#f24822", tooltip: "Red" },
  { option: "#ffa629", tooltip: "Orange" },
  { option: "#ffcd29", tooltip: "Yellow" },
  { option: "#14ae5c", tooltip: "Green" },
  { option: "#0d99ff", tooltip: "Blue" },
  { option: "#9747ff", tooltip: "Violet" },
  { option: "#ffffff", tooltip: "White" },
]

function hexToRgb (hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) {
    throw new Error(`Invalid hex color ${hex}`)
  }

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

function chooseTextColor (backgroundColor: string): WidgetJSX.Color {
  const { r, g, b } = hexToRgb(backgroundColor)

  return (r * 0.299 + g * 0.587 + b * 0.114 > 186 )
    ? { r: 0, g: 0, b: 0, a: 1 }
    : { r: 1, g: 1, b: 1, a: 1 }
}

function DatabaseTableWidget() {
  const [color, setColor] = useSyncedState("theme", colors[0].option)
  const [tableName, setTableName] = useSyncedState("tableName", null)
  const [columns, setColumns] = useSyncedState("columns", (): Column[] => [])

  useEffect(() => {
    figma.ui.onmessage = (message) => {
      const { action, data } = JSON.parse(message)
      switch (action) {
        case 'edit':
          setColumns(data)
          break
        case 'raw-edit':
          setColumns(data.columns)
          setColor(data.color)
          setTableName(data.tableName)
          break
      }

      figma.closePlugin()
    }
  })

  usePropertyMenu(
    [
      {
        itemType: "color-selector",
        propertyName: "colors",
        tooltip: "Color selector",
        selectedOption: color,
        options: colors,
      },
      {
        itemType: "action",
        tooltip: "Edit table",
        propertyName: "edit",
      },
      {
        itemType: "action",
        tooltip: "Raw edit table",
        propertyName: "raw-edit",
      },
    ],
    ({ propertyName, propertyValue }) => {
      switch (propertyName) {
        case "colors":
          return setColor(propertyValue)
        case "edit":
          return new Promise(() => {
            figma.showUI(__uiFiles__.edit_interface, {
              width: 700,
              height: 500,
              title: "Edit table",
            })
            figma.ui.postMessage(columns)
          })
        case "raw-edit":
          return new Promise(() => {
            figma.showUI(__uiFiles__.edit_raw_interface, {
              width: 700,
              height: 500,
              title: "Edit table (raw data)",
            })
            figma.ui.postMessage({
              tableName,
              color,
              columns,
            })
          })
      }
    }
  )

  return (
    <AutoLayout
      direction="vertical"
    >
      <AutoLayout
        width={400}
        height={48}
        cornerRadius={{
          topLeft: 16,
          topRight: 16,
        }}
        fill={color}
        padding={{
          horizontal: 16,
        }}
        horizontalAlignItems="center"
        verticalAlignItems="center"
      >
        <Input
          width="fill-parent"
          inputBehavior="truncate"
          fontWeight={700}
          fill={chooseTextColor(color)}
          horizontalAlignText="center"
          verticalAlignText="center"
          value={tableName}
          fontSize={24}
          onTextEditEnd={(event) => setTableName(event.characters)}
          placeholder="Table Name"
        />
      </AutoLayout>

      {columns.map((column) => {
        let { icon, color } = getKeyDecorator(column)

        return (
          <AutoLayout
            width={400}
            height={48}
            padding={{
              right: 16,
            }}
            key={column.name}
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
              fontFamily="Fira Code"
              fontSize={18}
            >
              {column.name}
            </Text>
            <Text
              fontFamily="Fira Code"
              fontSize={18}
            >
              {column.type}{column.nullable ? "?" : ""}
            </Text>
          </AutoLayout>
        )
      })}
    </AutoLayout>
  )
}

register(DatabaseTableWidget)
