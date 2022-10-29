function hexToRgb(hex: HexCode): WidgetJSX.Color {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) {
    throw new Error(`Invalid hex color ${hex}`)
  }

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: 255,
  }
}

export function chooseTextColor(backgroundColor: HexCode): HexCode {
  const { r, g, b } = hexToRgb(backgroundColor)

  return (r * 0.299 + g * 0.587 + b * 0.114 > 186)
    ? "#000000"
    : "#FFFFFF"
}

export const defaultHeaderColors: WidgetPropertyMenuColorSelectorOption[] = [
  { option: "#1E1E1E", tooltip: "Black" },
  { option: "#B3B3B3", tooltip: "Gray" },
  { option: "#F24822", tooltip: "Red" },
  { option: "#FFA629", tooltip: "Orange" },
  { option: "#FFCD29", tooltip: "Yellow" },
  { option: "#14AE5C", tooltip: "Green" },
  { option: "#0D99FF", tooltip: "Blue" },
  { option: "#9747FF", tooltip: "Violet" },
  { option: "#FFFFFF", tooltip: "White" },
  { option: "#757575", tooltip: "Dark gray" },
  { option: "#E6E6E6", tooltip: "Light gray" },
  { option: "#FFC7C2", tooltip: "Light red" },
  { option: "#FCD19C", tooltip: "Light orange" },
  { option: "#FFE8A3", tooltip: "Light yellow" },
  { option: "#AFF4C6", tooltip: "Light green" },
  { option: "#BDE3FF", tooltip: "Light blue" },
  { option: "#E4CCFF", tooltip: "Light violet" },
  { option: "#FFF8E7", tooltip: "Cosmic Latte" },
]

export default defaultHeaderColors
