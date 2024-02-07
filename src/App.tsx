"use client";

import { useState } from "react";
import Map from "./Map";
import Toolbar from "./Toolbar";
import "./App.css";

function App() {
  // Initial properties for layers
  const [layers, setLayers] = useState({
    stores: {
      visible: true,
      color: [234, 30, 47],
      outline_color: [0, 0, 0],
      radius: 5,
      outline: 1,
    },
    airports: {
      visible: true,
      color: [65, 157, 80],
      outline_color: [0, 0, 0],
      radius: 3,
      outline: 1,
    },
    blockground: {
      visible: true,
      color: [231, 159, 213],
    },
  });

  return (
    <>
      <Toolbar layers={layers} setLayers={setLayers} />
      <Map layers={layers} />
    </>
  );
}

export default App;
