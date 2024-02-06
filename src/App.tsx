"use client";

import { useState } from "react";
import Map from "./Map";
import Toolbar from "./Toolbar";
import "./App.css";

function App() {
  const [layersColor, setLayersColor] = useState({
    stores: [238, 77, 90],
    airports: [53, 94, 59],
    blockground: [231, 159, 213],
  });

  return (
    <>
      <Toolbar layersColor={layersColor} setLayersColor={setLayersColor} />
      <Map layersColor={layersColor} />
    </>
  );
}

export default App;
