import { getRandomColorFromSubset } from "../utils/colorUtils.ts";
import Shapes from "./Shapes.tsx";

const SvgElement = ({
  size,
  colorCount,
  selectedShape,
  deviation,
  selectedColorSetIndex,
  fill,
}: {
  size: number;
  colorCount: number;
  selectedShape: string;
  deviation: number;
  selectedColorSetIndex: number;
  fill: number;
}) => {
  const color = getRandomColorFromSubset(colorCount, selectedColorSetIndex);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
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
