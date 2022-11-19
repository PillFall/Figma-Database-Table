import {
  chooseTextColor,
} from "./color"

const { widget } = figma
const {
  // Components
  AutoLayout,
  Input,
} = widget

export function Header(props) {
  const {
    color,
    title,
    onTextEditEnd,
  } = props

  return (
    <AutoLayout
      width="fill-parent"
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
        value={title}
        fontSize={24}
        onTextEditEnd={onTextEditEnd}
        placeholder="Table Name"
      />
    </AutoLayout>
  )
}

export default Header
