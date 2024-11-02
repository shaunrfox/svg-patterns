import React from "react";

interface ShapeProps {
  shape: string;
  size: number;
  color: string;
}

const Shapes = ({ shape, size, color }: ShapeProps) => {
  switch (shape) {
    case "triangle":
      return (
        <polygon
          points={`0,0 ${size},0 0,${size}`}
          fill={color}
          stroke="white"
          strokeWidth="1"
        />
      );
    case "rectangle":
      return (
        <rect
          width={size}
          height={size}
          fill={color}
          stroke="white"
          strokeWidth="1"
        />
      );
    case "ellipse":
      return (
        <ellipse
          cx={size / 2}
          cy={size / 2}
          rx={size / 2}
          ry={size / 2}
          fill={color}
          stroke="white"
          strokeWidth="1"
        />
      );
    default:
      return null;
  }
};

export default Shapes;
