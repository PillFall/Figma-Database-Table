
import {
  chooseTextColor,
  defaultHeaderColors,
} from "./color"
import {
  KeyColumn,
  Column,
} from "./column"
import { defaultSizes } from "./size"

const { widget } = figma
const {
  // Components
  AutoLayout,
  Input,

  // Hooks
  useEffect,
  usePropertyMenu,
  useSyncedState,

  // Funtions
  register,
} = widget

const startColor: HexCode = defaultHeaderColors[Math.floor(Math.random() * defaultHeaderColors.length)].option

function DatabaseTableWidget() {
  const [color, setColor] = useSyncedState("theme", startColor)
  const [size, setSize] = useSyncedState("size", "400")
  const [tableName, setTableName] = useSyncedState("tableName", null)
  const [columns, setColumns] = useSyncedState("columns", (): Column[] => [])

  useEffect(() => {
    figma.ui.onmessage = (message) => {
      const { action, data } = JSON.parse(message)
      switch (action) {
        case "edit":
          setColumns(data)
          break
        case "rawEdit":
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
        propertyName: "color",
        tooltip: "Color selector",
        selectedOption: color,
        options: defaultHeaderColors,
      },
      {
        itemType: "dropdown",
        propertyName: "size",
        tooltip: "Size",
        selectedOption: size,
        options: defaultSizes,
      },
      {
        itemType: "action",
        tooltip: "Edit table",
        propertyName: "edit",
      },
      {
        itemType: "action",
        tooltip: "Edit raw JSON",
        propertyName: "rawEdit",
      },
    ],
    ({ propertyName, propertyValue }) => {
      switch (propertyName) {
        case "color":
          return setColor(propertyValue)
        case "size":
          return setSize(propertyValue)
        case "edit":
          return new Promise(() => {
            figma.showUI(__uiFiles__.edit, {
              width: 700,
              height: 500,
              title: "Table Editor",
            })
            figma.ui.postMessage(columns)
          })
        case "rawEdit":
          return new Promise(() => {
            figma.showUI(__uiFiles__.rawEdit, {
              width: 700,
              height: 500,
              title: "Raw JSON Editor",
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
        width={parseInt(size)}
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

      {columns.map((column) => (<KeyColumn key={column.name} column={column} />))}
    </AutoLayout>
  )
}

register(DatabaseTableWidget)
