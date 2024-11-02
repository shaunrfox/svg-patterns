import { useState } from "react";
import Grid from "./components/Grid.tsx";
import Controls from "./components/Controls.tsx";
import "./App.css";

function App() {
  const [gridSize, setGridSize] = useState(20);
  const [gapSize, setGapSize] = useState(15);
  const [colorCount, setColorCount] = useState(5);
  const [selectedShape, setSelectedShape] = useState("triangle");
  const [deviation, setDeviation] = useState(2);
  const [fill, setFill] = useState(6);
  const [selectedColorSetIndex, setSelectedColorSetIndex] = useState(0);

  return (
    <div className="app">
      <Controls
        gridSize={gridSize}
        setGridSize={setGridSize}
        gapSize={gapSize}
        setGapSize={setGapSize}
        colorCount={colorCount}
        setColorCount={setColorCount}
        selectedShape={selectedShape}
        setSelectedShape={setSelectedShape}
        deviation={deviation}
        setDeviation={setDeviation}
        selectedColorSetIndex={selectedColorSetIndex}
        setSelectedColorSetIndex={setSelectedColorSetIndex}
        fill={fill}
        setFill={setFill}
      />
      <Grid
        gridSize={gridSize}
        gapSize={gapSize}
        colorCount={colorCount}
        selectedShape={selectedShape}
        deviation={deviation}
        selectedColorSetIndex={selectedColorSetIndex}
        fill={fill}
      />
    </div>
  );
}

export default App;
