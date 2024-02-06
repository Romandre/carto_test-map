"use client";

import { useState } from "react";
import Map from "./Map";
import Toolbar from "./Toolbar";
import "./App.css";

function App() {
  const [layers, setLayers] = useState({
    stores: { visible: true, color: [234, 30, 47] },
    airports: { visible: true, color: [65, 157, 80] },
    blockground: { visible: true, color: [231, 159, 213] },
  });

  return (
    <>
      <Toolbar layers={layers} setLayers={setLayers} />
      <Map layers={layers} />
    </>
  );
}

export default App;
