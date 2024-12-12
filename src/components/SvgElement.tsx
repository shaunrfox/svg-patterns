import { getRandomColorFromSubset } from "../utils/colorUtils.ts";
import Shapes from "./Shapes.tsx";

const SvgElement = ({
  size,
  colorCount,
  selectedShape,
  deviation,
  selectedColorSetIndex,
  fill,
  x,
  y,
}: {
  size: number;
  colorCount: number;
  selectedShape: string;
  deviation: number;
  selectedColorSetIndex: number;
  fill: number;
  x: number;
  y: number;
}) => {
  const color = getRandomColorFromSubset(colorCount, selectedColorSetIndex);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} x={x} y={y}>
      <Shapes
        shape={selectedShape}
        size={size}
        color={color}
        deviation={deviation}
        selectedColorSetIndex={selectedColorSetIndex}
        colorCount={colorCount}
        fill={fill}
      />
    </svg>
  );
};

export default SvgElement;
