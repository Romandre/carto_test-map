import { useCallback, useState } from "react";

import { TLayers } from "./types/layers";

import "./Toolbar.css";

type Props = {
  layersColor: TLayers;
  setLayersColor: React.Dispatch<React.SetStateAction<TLayers>>;
};

function Toolbar({ layersColor, setLayersColor }: Props) {
  const changeColor = useCallback(
    (item: string) => {
      setLayersColor((prev) => ({ ...prev, [item]: [215, 3, 252] }));
    },
    [setLayersColor]
  );

  return (
    <div className="toolbar">
      <div className="layers">
        <div>
          <h3>Retail stores</h3>
          <button onClick={() => changeColor("stores")}>Change color</button>
        </div>
        <div>
          <h3>World Airports</h3>
          <button onClick={() => changeColor("airports")}>Change color</button>
        </div>
        <div>
          <h3>USA Sociodemographics</h3>
          <button onClick={() => changeColor("blockground")}>
            Change color
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
