import { useCallback, useState } from "react";
import { SketchPicker } from "react-color";

import { TLayers } from "./types/layers";
import { ColorResult } from "react-color";

import "./Toolbar.css";

//---------------------------------------------

const titles = ["Retail stores", "World Airports", "USA Sociodemographics"];

type Props = {
  layers: TLayers;
  setLayers: React.Dispatch<React.SetStateAction<TLayers>>;
};

//---------------------------------------------

function Toolbar({ layers, setLayers }: Props) {
  const [activePicker, setActivePicker] = useState("");

  const showColorPicker = useCallback(
    (item: string) => {
      setActivePicker(item);
    },
    [setActivePicker]
  );

  const changeColor = useCallback(
    (color: ColorResult, item: string) => {
      const layerObject = {
        ...layers[item as keyof TLayers],
        color: [color.rgb.r, color.rgb.g, color.rgb.b],
      };

      setLayers((prev) => ({
        ...prev,
        [item]: layerObject,
      }));
    },
    [layers, setLayers]
  );

  const toggleLayer = useCallback(
    (item: string) => {
      const layerObject = {
        ...layers[item as keyof TLayers],
        visible: !layers[item as keyof TLayers].visible,
      };

      setLayers((prev) => ({
        ...prev,
        [item]: layerObject,
      }));
    },
    [layers, setLayers]
  );

  return (
    <div className="toolbar">
      <div className="layers">
        {Object.values(layers).map((item, index) => {
          const layerName = Object.keys(layers)[index];
          const rgb = {
            r: item.color[0],
            g: item.color[1],
            b: item.color[2],
          };

          return (
            <div key={index}>
              <div className="title">
                <span
                  className="color-tile"
                  style={{ background: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
                ></span>
                <span>{titles[index]}</span>
              </div>
              <button
                className="layer-trigger"
                onClick={() => toggleLayer(layerName)}
              >
                {item.visible ? "Disable" : "Enable"}
              </button>
              <button
                className="color-trigger"
                onClick={() => showColorPicker(layerName)}
              >
                Change color
              </button>
              <div
                className={`color-picker ${
                  activePicker === layerName ? "active" : ""
                }`}
                onMouseLeave={() => setActivePicker("")}
              >
                <SketchPicker
                  color={rgb}
                  onChangeComplete={(color) => changeColor(color, layerName)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Toolbar;
