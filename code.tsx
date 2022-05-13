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
  const [theme, setTheme] = useSyncedState("theme", "#000c86")
  const [collapsed, setCollapsed] = useSyncedState("collapsed", false)
  const [tableName, setTableName] = useSyncedState("tableName", null)
  const [columns, setColumns] = useSyncedState("columns", (): Column[] => [])

  useEffect(() => {
    figma.ui.onmessage = (newColumns) => {
      setColumns(JSON.parse(newColumns))
      figma.closePlugin()
    }
  })

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
      {
        itemType: "action",
        tooltip: "Edit table",
        propertyName: "edit",
      },
      {
        itemType: "action",
        tooltip: collapsed ? "Expand" : "Collapse",
        propertyName: "collapse",
      },
    ],
    ({ propertyName, propertyValue }) => {
      switch (propertyName) {
        case "colors":
          return setTheme(propertyValue)

        case "edit":
          return new Promise(() => {
            figma.showUI(__html__, {
              width: 700,
              height: 500,
              title: "Edit table",
            })
            figma.ui.postMessage(columns)
          })
        case "collapse":
          return setCollapsed((state) => !state)
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
        fill={theme}
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
          fill="#ffffff"
          horizontalAlignText="center"
          verticalAlignText="center"
          value={tableName}
          fontSize={24}
          onTextEditEnd={(event) => setTableName(event.characters)}
          placeholder="Table Name"
        />
      </AutoLayout>

      {
        collapsed ? (
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
              fontSize={18}
              fontFamily="Font Awesome 5 Free"
              fontWeight={900}
              verticalAlignText="center"
              horizontalAlignText="center"
              onClick={() => setCollapsed(false)}
            >
              {columns.length} collapsed fields. Click to reveal
            </Text>
          </AutoLayout>
        ) : columns.map((column) => {
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
        })
      }
    </AutoLayout>
  )
}

register(DatabaseTableWidget)
