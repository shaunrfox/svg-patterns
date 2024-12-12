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
  const SvgElement = ({ children }: { children: React.ReactNode }) => (
    <svg className="color-wheel" height="20" width="20" viewBox="0 0 20 20">
      {children}
    </svg>
  );

  const ColorWheel = () => {
    const colorSegments = colors.map((color, i) => {
      const key = `color-${i}`;
      const percentage = 100 - (i / colors.length) * 100;
      const strokeDasharray = `${(percentage * 31.4) / 100} 31.4`;
      return (
        <circle
          key={key}
          r="5"
          cx="10"
          cy="10"
          fill="transparent"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={strokeDasharray}
          transform="rotate(-90) translate(-20)"
        />
      );
    });

    return <SvgElement>{colorSegments}</SvgElement>;
  };

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
      <ColorWheel />
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

  const handleDownload = () => {
    const svgElement = document.getElementById("generated-svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "pattern.svg";
    link.click();

    URL.revokeObjectURL(url);
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

      <div className="radio-group color-picker">
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
      <button className="button" onClick={handleDownload} style={{ marginTop: "auto" }}>
        <span>Download pattern</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 8.5V12.5C15 12.7652 14.8946 13.0196 14.7071 13.2071C14.5196 13.3946 14.2652 13.5 14 13.5H2C1.73478 13.5 1.48043 13.3946 1.29289 13.2071C1.10536 13.0196 1 12.7652 1 12.5V8.5C1 8.23478 1.10536 7.98043 1.29289 7.79289C1.48043 7.60536 1.73478 7.5 2 7.5H4.5C4.63261 7.5 4.75979 7.55268 4.85355 7.64645C4.94732 7.74021 5 7.86739 5 8C5 8.13261 4.94732 8.25979 4.85355 8.35355C4.75979 8.44732 4.63261 8.5 4.5 8.5H2V12.5H14V8.5H11.5C11.3674 8.5 11.2402 8.44732 11.1464 8.35355C11.0527 8.25979 11 8.13261 11 8C11 7.86739 11.0527 7.74021 11.1464 7.64645C11.2402 7.55268 11.3674 7.5 11.5 7.5H14C14.2652 7.5 14.5196 7.60536 14.7071 7.79289C14.8946 7.98043 15 8.23478 15 8.5ZM7.64625 8.35375C7.69269 8.40024 7.74783 8.43712 7.80853 8.46228C7.86923 8.48744 7.93429 8.50039 8 8.50039C8.06571 8.50039 8.13077 8.48744 8.19147 8.46228C8.25217 8.43712 8.30731 8.40024 8.35375 8.35375L11.3538 5.35375C11.4476 5.25993 11.5003 5.13268 11.5003 5C11.5003 4.86732 11.4476 4.74007 11.3538 4.64625C11.2599 4.55243 11.1327 4.49972 11 4.49972C10.8673 4.49972 10.7401 4.55243 10.6462 4.64625L8.5 6.79313V1.5C8.5 1.36739 8.44732 1.24021 8.35355 1.14645C8.25979 1.05268 8.13261 1 8 1C7.86739 1 7.74021 1.05268 7.64645 1.14645C7.55268 1.24021 7.5 1.36739 7.5 1.5V6.79313L5.35375 4.64625C5.25993 4.55243 5.13268 4.49972 5 4.49972C4.86732 4.49972 4.74007 4.55243 4.64625 4.64625C4.55243 4.74007 4.49972 4.86732 4.49972 5C4.49972 5.13268 4.55243 5.25993 4.64625 5.35375L7.64625 8.35375ZM12.5 10.5C12.5 10.3517 12.456 10.2067 12.3736 10.0833C12.2912 9.95999 12.1741 9.86386 12.037 9.80709C11.9 9.75033 11.7492 9.73547 11.6037 9.76441C11.4582 9.79335 11.3246 9.86478 11.2197 9.96967C11.1148 10.0746 11.0433 10.2082 11.0144 10.3537C10.9855 10.4992 11.0003 10.65 11.0571 10.787C11.1139 10.9241 11.21 11.0412 11.3333 11.1236C11.4567 11.206 11.6017 11.25 11.75 11.25C11.9489 11.25 12.1397 11.171 12.2803 11.0303C12.421 10.8897 12.5 10.6989 12.5 10.5Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  );
};

export default Controls;
