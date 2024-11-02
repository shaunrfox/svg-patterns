import React from "react";
import { getRandomColorFromSubset } from "../utils/colorUtils.ts";

interface ShapeProps {
  shape: string;
  size: number;
  color: string;
  deviation: number;
  selectedColorSetIndex: number;
  colorCount: number;
  fill: number;
}

const Shapes = ({
  shape,
  size,
  color,
  deviation,
  selectedColorSetIndex,
  colorCount,
  fill,
}: ShapeProps) => {
  const getWeightedRandom = (max: number, fill: number): number => {
    // For fill=1, ~90% chance of 0
    // For fill=10, 0% chance of 0
    const zeroThreshold = (9 - fill) / 10;
    const rand = Math.random();
    if (rand < zeroThreshold) return 0;
    return Math.floor(Math.random() * max) + 1;
  };

  const numPolygons = getWeightedRandom(2, fill);
  const numRectangles = getWeightedRandom(1, fill);
  const numEllipses = getWeightedRandom(1, fill);
  const getRandomColor = () =>
    getRandomColorFromSubset(colorCount, selectedColorSetIndex);

  const getOffset = (deviation: number, max: number = Infinity): number => {
    if (!deviation || isNaN(deviation)) return 0;
    const offset = Math.floor(Math.random() * deviation * 2) - deviation;
    return Math.max(0, Math.min(max, offset));
  };

  const dev = deviation;

  switch (shape) {
    case "triangle":
      if (numPolygons === 0) {
        return null;
      } else if (numPolygons === 1) {
        return (
          <>
            <polygon
              points={`${getOffset(dev, size)},0 ${size},0 ${getOffset(
                dev,
                size
              )},${size} z`}
              fill={color}
              stroke="white"
              strokeWidth="1"
            />
          </>
        );
      } else {
        return (
          <>
            <polygon
              points={`${getOffset(dev, size)},0 ${size},0 ${getOffset(
                dev,
                size
              )},${size} z`}
              fill={getRandomColor()}
              stroke="white"
              strokeWidth="1"
            />
            <polygon
              points={`${getOffset(
                dev,
                size
              )},${size} ${size},${size} ${size},${getOffset(dev, size)} z`}
              fill={getRandomColor()}
              stroke="white"
              strokeWidth="1"
            />
          </>
        );
      }
    case "rectangle":
      if (numRectangles === 0) {
        return null;
      } else {
        return (
          <path
            d={`M ${getOffset(deviation / 2, size)},${getOffset(
              deviation / 2,
              size
            )}
             L ${size - getOffset(deviation / 2, size)},${getOffset(
              deviation / 2,
              size
            )}
             L ${size - getOffset(deviation / 2, size)},${
              size - getOffset(deviation / 2, size)
            }
             L ${getOffset(deviation / 2, size)},${
              size - getOffset(deviation / 2, size)
            }
             Z`}
            fill={color}
            stroke="white"
            strokeWidth="1"
          />
        );
      }
    case "ellipse":
      if (numEllipses === 0) {
        return null;
      } else {
        return (
          <ellipse
            cx={size / 2 + getOffset(deviation, size / 2)}
            cy={size / 2 + getOffset(deviation, size / 2)}
            rx={size / 2}
            ry={size / 2}
            fill={color}
            stroke="white"
            strokeWidth="1"
          />
        );
      }
    default:
      return null;
  }
};

export default Shapes;
