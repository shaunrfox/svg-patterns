import React from "react";
import { colors } from "../utils/colorUtils.ts";

interface ColorPickerOptionProps {
  colors: string[];
  selectedColorSetIndex: number;
  setSelectedColorSetIndex: (value: number) => void;
  index: number;
}

const ColorPickerOption: React.FC<ColorPickerOptionProps> = ({
  colors,
  selectedColorSetIndex,
  setSelectedColorSetIndex,
  index,
}) => {
  const swatches = colors.map((color, i) => (
    <div key={i} className="swatch" style={{ backgroundColor: color }} />
  ));

  return (
    <label>
      <input
        type="radio"
        name="color-set"
        value={selectedColorSetIndex}
        checked={selectedColorSetIndex === index}
        onChange={() => setSelectedColorSetIndex(index)}
      />
      <span>{index + 1}</span>
      <div className="swatches">{swatches}</div>
    </label>
  );
};

export const Controls = ({
  gridSize,
  setGridSize,
  gapSize,
  setGapSize,
  colorCount,
  setColorCount,
  selectedShape,
  setSelectedShape,
  deviation,
  setDeviation,
  selectedColorSetIndex,
  setSelectedColorSetIndex,
  fill,
  setFill,
}: {
  gridSize: number;
  setGridSize: (value: number) => void;
  gapSize: number;
  setGapSize: (value: number) => void;
  colorCount: number;
  setColorCount: (value: number) => void;
  selectedShape: string;
  setSelectedShape: (value: string) => void;
  deviation: number;
  setDeviation: (value: number) => void;
  selectedColorSetIndex: number;
  setSelectedColorSetIndex: (value: number) => void;
  fill: number;
  setFill: (value: number) => void;
}) => {
  const handleDeviationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value);
    const convertedValue = Math.min(value, gridSize / 2);
    setDeviation(convertedValue);
  };

  return (
    <div className="controls">
      <div className="radio-group">
        <label>Shape</label>
        <div className="options">
          <label>
            <input
              type="radio"
              name="shape"
              value="triangle"
              checked={selectedShape === "triangle"}
              onChange={(e) => setSelectedShape(e.target.value)}
            />
            <span>Triangle</span>
            <svg viewBox="0 0 100 100" className="triangle" fill="currentColor">
              <polygon points="0,95 100,95 50,5" />
            </svg>
          </label>
          <label>
            <input
              type="radio"
              name="shape"
              value="rectangle"
              checked={selectedShape === "rectangle"}
              onChange={(e) => setSelectedShape(e.target.value)}
            />
            <span>Rectangle</span>
            <svg
              viewBox="0 0 100 100"
              className="rectangle"
              fill="currentColor"
            >
              <rect width="95" height="95" x="2.5" y="2.5" />
            </svg>
          </label>
          <label>
            <input
              type="radio"
              name="shape"
              value="ellipse"
              checked={selectedShape === "ellipse"}
              onChange={(e) => setSelectedShape(e.target.value)}
            />
            <span>Ellipse</span>
            <svg viewBox="0 0 100 100" className="ellipse" fill="currentColor">
              <ellipse cx="50" cy="50" rx="50" ry="50" />
            </svg>
          </label>
        </div>
      </div>

      <div className="rule"></div>

      <div className="radio-group">
        <label>Color set</label>
        <div className="options">
          {colors.map((colorSet, index) => (
            <ColorPickerOption
              key={index}
              colors={colorSet}
              selectedColorSetIndex={selectedColorSetIndex}
              setSelectedColorSetIndex={setSelectedColorSetIndex}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="slider-group">
        <label>
          <span>Color count</span>
          <span>{colorCount}</span>
        </label>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={colorCount}
          onChange={(e) => setColorCount(Number(e.target.value))}
        />
      </div>

      <div className="rule"></div>

      <div className="slider-group">
        <label>
          <span>Fill</span>
          <span>{fill}</span>
        </label>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={fill}
          onChange={(e) => setFill(Number(e.target.value))}
        />
      </div>
      <div className="slider-group">
        <label>
          <span>Grid Size</span>
          <span>{gridSize}</span>
        </label>
        <input
          type="range"
          min="5"
          max="100"
          step="5"
          value={gridSize}
          onChange={(e) => setGridSize(Number(e.target.value))}
        />
      </div>
      <div className="slider-group">
        <label>
          <span>Gap Size</span>
          <span>{gapSize}</span>
        </label>
        <input
          type="range"
          min="5"
          max="30"
          step="1"
          value={gapSize}
          onChange={(e) => setGapSize(Number(e.target.value))}
        />
      </div>
      <div className="slider-group">
        <label>
          <span>Deviation</span>
          <span>{deviation}</span>
        </label>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={deviation}
          onChange={handleDeviationChange}
        />
      </div>
    </div>
  );
};

export default Controls;
