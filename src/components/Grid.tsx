import React, { useEffect, useRef } from "react";
import SvgElement from "./SvgElement.tsx";
import { getTargetSize } from "../utils/svgUtils.ts";
import { updateColorSubset } from "../utils/colorUtils.ts";

export const gridPadding = 64;

const Grid = ({
  gridSize,
  gapSize,
  colorCount,
  selectedShape,
  deviation,
  selectedColorSetIndex,
  fill,
}: {
  gridSize: number;
  gapSize: number;
  colorCount: number;
  selectedShape: string;
  deviation: number;
  selectedColorSetIndex: number;
  fill: number;
}) => {
  const wrapperRef = useRef(null);
  const [gridDimensions, setGridDimensions] = React.useState({
    cols: 0,
    rows: 0,
  });

  useEffect(() => {
    const updateSize = () => {
      if (wrapperRef.current) {
        const newSize = getTargetSize(wrapperRef.current);

        // Calculate effective cell size including gap
        const effectiveGridSize = gridSize + gapSize;

        // Ensure we have at least 1 column and row
        const numCols = Math.max(1, Math.floor(newSize.width / effectiveGridSize));
        const numRows = Math.max(1, Math.floor(newSize.height / effectiveGridSize));
        setGridDimensions({ cols: numCols, rows: numRows });
      }
    };

    // Set initial size
    updateSize();

    // Add resize listener
    globalThis.addEventListener("resize", updateSize);

    // Cleanup
    return () => globalThis.removeEventListener("resize", updateSize);
  }, [gridSize, gapSize]); // Add gridSize and gapSize as dependencies

  // Separate useEffect for color updates
  useEffect(() => {
    // Force a re-render of all SVG elements when color set changes
    updateColorSubset(colorCount, selectedColorSetIndex);
    setGridDimensions((prev) => ({ ...prev })); // Trigger re-render
  }, [colorCount, selectedColorSetIndex]);

  // console.log("wrapperSize", wrapperSize);

  // const gridMinusGap = gridSize - gapSize / 2;

  // console.log("gridSize", gridSize);
  // console.log("gapSize", gapSize);
  // console.log("gridMinusGap", gridMinusGap);

  const totalElements = gridDimensions.rows * gridDimensions.cols;

  const getPosition = (index: number) => {
    const row = Math.floor(index / Math.max(1, gridDimensions.cols));
    const col = index % Math.max(1, gridDimensions.cols);
    const x = Math.max(0, col * (gridSize + gapSize));
    const y = Math.max(0, row * (gridSize + gapSize));
    return { x, y };
  };

  return (
    <div className="grid-wrapper" ref={wrapperRef}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={gridSize * gridDimensions.cols + gapSize * (gridDimensions.cols - 1)}
        height={gridSize * gridDimensions.rows + gapSize * (gridDimensions.rows - 1)}
        id="generated-svg"
        className="wrapper"
        style={{
          gridTemplateColumns: `repeat(${gridDimensions.cols}, ${gridSize}px)`,
          gridTemplateRows: `repeat(${gridDimensions.rows}, ${gridSize}px)`,
          gap: `${gapSize}px`,
        }}
      >
        {Array.from({ length: totalElements }, (_, index) => {
          const { x, y } = getPosition(index);
          return (
            <SvgElement
              key={`${index}-${selectedColorSetIndex}-${colorCount}`}
              size={gridSize}
              colorCount={colorCount}
              selectedShape={selectedShape}
              deviation={deviation}
              selectedColorSetIndex={selectedColorSetIndex}
              fill={fill}
              x={x}
              y={y}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default Grid;
