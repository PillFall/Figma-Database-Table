const { widget } = figma
const {
  useSyncedState,
  useEffect,
  Rectangle,
  Input,
  Frame,
  AutoLayout
} = widget

function Widget() {
  const [tableName, setTableName] = useSyncedState("tableName", null)

  return (
    <Frame
      width={400}
      height={48}
    >
      <Rectangle
        width={400}
        height={48}
        x={0}
        y={0}
        fill="#000c86"
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
  )
}

widget.register(Widget)
