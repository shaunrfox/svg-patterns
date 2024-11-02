import { getRandomColorFromSubset } from "../utils/colorUtils.ts";
import Shapes from "./Shapes.tsx";
import { useState } from "react";

const SvgElement = ({
  size,
  colorCount,
  selectedShape,
}: {
  size: number;
  colorCount: number;
  selectedShape: string;
}) => {
  const color = getRandomColorFromSubset(colorCount);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      <Shapes shape={selectedShape} size={size} color={color} />
    </svg>
  );
};

export default SvgElement;
