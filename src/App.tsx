import { useState } from "react";
import Grid from "./components/Grid.tsx";
import Controls from "./components/Controls.tsx";
import "./App.css";

function App() {
  const [gridSize, setGridSize] = useState(50);
  const [gapSize, setGapSize] = useState(2);
  const [colorCount, setColorCount] = useState(12);
  const [selectedShape, setSelectedShape] = useState("triangle");

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
      />
      <Grid
        gridSize={gridSize}
        gapSize={gapSize}
        colorCount={colorCount}
        selectedShape={selectedShape}
      />
    </div>
  );
}

export default App;
