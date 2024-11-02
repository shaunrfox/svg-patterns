export const Controls = ({
  gridSize,
  setGridSize,
  gapSize,
  setGapSize,
  colorCount,
  setColorCount,
  selectedShape,
  setSelectedShape,
}: {
  gridSize: number;
  setGridSize: (value: number) => void;
  gapSize: number;
  setGapSize: (value: number) => void;
  colorCount: number;
  setColorCount: (value: number) => void;
  selectedShape: string;
  setSelectedShape: (value: string) => void;
}) => (
  <div className="controls">
    <div className="radio-group">
      <label>Shape</label>
      <div className="shape-options">
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
          <svg viewBox="0 0 100 100" className="rectangle" fill="currentColor">
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
    <div className="slider-group">
      <label>
        <span>Grid Size</span>
        <span>{gridSize}</span>
      </label>
      <input
        type="range"
        min="20"
        max="200"
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
        min="0"
        max="30"
        step="1"
        value={gapSize}
        onChange={(e) => setGapSize(Number(e.target.value))}
      />
    </div>
    <div className="slider-group">
      <label>
        <span>Colors</span>
        <span>{colorCount}</span>
      </label>
      <input
        type="range"
        min="1"
        max="12"
        step="1"
        value={colorCount}
        onChange={(e) => setColorCount(Number(e.target.value))}
      />
    </div>
  </div>
);

export default Controls;
