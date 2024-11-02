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
}: {
  gridSize: number;
  gapSize: number;
  colorCount: number;
  selectedShape: string;
}) => {
  const wrapperRef = useRef(null);
  const [wrapperSize, setWrapperSize] = React.useState({ width: 0, height: 0 });
  const [gridDimensions, setGridDimensions] = React.useState({
    cols: 0,
    rows: 0,
  });

  useEffect(() => {
    const updateSize = () => {
      if (wrapperRef.current) {
        setWrapperSize(getTargetSize(wrapperRef.current));
      }
    };

    // Set initial size
    updateSize();

    // Add resize listener
    globalThis.addEventListener("resize", updateSize);

    // Cleanup
    return () => globalThis.removeEventListener("resize", updateSize);
  }, []); // Empty dependency array since we want this to run once on mount

  useEffect(() => {
    if (wrapperRef.current) {
      const newSize = getTargetSize(wrapperRef.current);
      setWrapperSize(newSize);

      // Calculate effective cell size including gap
      const effectiveGridSize = gridSize + gapSize;

      // Recalculate grid dimensions using effective size
      const numCols = Math.floor(newSize.width / effectiveGridSize);
      const numRows = Math.floor(newSize.height / effectiveGridSize);
      setGridDimensions({ cols: numCols, rows: numRows });
    }
  }, [gridSize, gapSize, colorCount]); // Add all control values as dependencies

  // Add effect to update color subset when colorCount changes
  useEffect(() => {
    updateColorSubset(colorCount);
  }, [colorCount]);

  console.log("wrapperSize", wrapperSize);

  const gridMinusGap = gridSize - gapSize / 2;

  console.log("gridSize", gridSize);
  console.log("gapSize", gapSize);
  console.log("gridMinusGap", gridMinusGap);

  const totalElements = gridDimensions.rows * gridDimensions.cols;

  return (
    <div
      className="wrapper"
      ref={wrapperRef}
      style={{
        padding: `${gridPadding}px`,
        gridTemplateColumns: `repeat(${gridDimensions.cols}, ${gridSize}px)`,
        gridTemplateRows: `repeat(${gridDimensions.rows}, ${gridSize}px)`,
        gap: `${gapSize}px`,
      }}
    >
      {Array.from({ length: totalElements }, (_, index) => (
        <SvgElement
          key={index}
          size={gridSize}
          colorCount={colorCount}
          selectedShape={selectedShape}
        />
      ))}
    </div>
  );
};

export default Grid;
