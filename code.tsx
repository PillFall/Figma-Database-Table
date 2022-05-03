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

function DatabaseTableWidget() {
  const [theme, setTheme] = useSyncedState("theme", "#0d99ff")
  const [tableName, setTableName] = useSyncedState("tableName", null)
  const [columns, setColumns] = useSyncedState("columns", (): Column[] => [])

  usePropertyMenu(
    [
      {
        itemType: "color-selector",
        propertyName: "colors",
        tooltip: "Color selector",
        selectedOption: theme,
        options: [
          {
            option: "#000c86",
            tooltip: "Blue",
          },
          {
            option: "#000000",
            tooltip: "Black",
          }
        ],
      },
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName === "colors") {
        setTheme(propertyValue)
      }
    }
  )

  return (
    <AutoLayout
      direction="vertical"
    >
      <Frame
        width={400}
        height={48}
      >
        <Rectangle
          width={400}
          height={48}
          x={0}
          y={0}
          fill={theme}
          cornerRadius={{
            topLeft: 16,
            topRight: 16,
          }}
        />
        <Input
          width={368}
          height={32}
          inputFrameProps={{
            x: 16,
            y: 8,
          }}
          fontWeight={700}
          inputBehavior="truncate"
          fill="#ffffff"
          horizontalAlignText="center"
          verticalAlignText="center"
          value={tableName}
          fontSize={24}
          onTextEditEnd={(event) => setTableName(event.characters)}
          placeholder="Table Name"
        />
      </Frame>

      {columns.map((column) => {
        let { icon, color } = getKeyDecorator(column)

        return (
          <Frame
            width={400}
            height={48}
            key={column.name}
          >
            <Rectangle
              width={400}
              height={48}
              stroke="#e6e6e6"
              fill="#ffffff"
            />
            <AutoLayout
              width={384}
              height={48}
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
          </Frame>
        )
      })}
    </AutoLayout >
  )
}

register(DatabaseTableWidget)
