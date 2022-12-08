const { widget } = figma
const {
  // Components
  AutoLayout,
  Text,
} = widget

import {
  KeyType,
} from "./key"
import {
  getKeyDecorator,
} from "./key"

export interface Index {
  name: string[]
  keyType: KeyType
}

export function KeyIndex(props) {
  const { index } = props
  const { icon, color } = getKeyDecorator(index)

  return (
    <AutoLayout
      width="fill-parent"
      height={48}
      padding={{
        right: 16,
      }}
      cornerRadius={8}
      stroke="#e6e6e6"
      fill="#ffffff"
      verticalAlignItems="center"
      horizontalAlignItems="center"
    >
      <Text
        width={32}
        height={32}
        fontSize={18}
        fontFamily="Font Awesome 6 Free"
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
        {index.name.join(", ")}
      </Text>
    </AutoLayout>
  )
}

export function KeyIndexes(props) {
  const {
    indexes,
  } = props

  return (
    <AutoLayout
      width="fill-parent"
      height="hug-contents"
      padding={12}
      stroke="#e6e6e6"
      fill="#ffffff"
      verticalAlignItems="center"
      horizontalAlignItems="center"
    >
      <AutoLayout
        width="fill-parent"
        height="hug-contents"
        padding={12}
        fill="#e6e6e6"
        cornerRadius={8}
        direction="vertical"
      >
        <Text
          width="fill-parent"
          height={32}
          fontFamily="Inter"
          fontWeight={600}
          fontSize={20}
        >
          Indexes
        </Text>
        {indexes.map((index) => (<KeyIndex key={index.name} index={index} />))}
      </AutoLayout>
    </AutoLayout>
  )
}
