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
  const [colorType, setColorType] = useState("fill");

  const showColorPicker = useCallback(
    (item: string, type: string) => {
      setActivePicker(item);
      setColorType(type);
    },
    [setActivePicker, setColorType]
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

  const changeColor = useCallback(
    (color: ColorResult, item: string) => {
      let layerObject = {};
      if (colorType === "fill") {
        layerObject = {
          ...layers[item as keyof TLayers],
          color: [color.rgb.r, color.rgb.g, color.rgb.b],
        };
      } else {
        layerObject = {
          ...layers[item as keyof TLayers],
          outline_color: [color.rgb.r, color.rgb.g, color.rgb.b],
        };
      }

      setLayers((prev) => ({
        ...prev,
        [item]: layerObject,
      }));
    },
    [layers, setLayers, colorType]
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
          let colorTile = {
            background: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
            border: "",
          };
          let outline_rgb = rgb;

          if ("outline_color" in item) {
            outline_rgb = {
              r: item.outline_color[0],
              g: item.outline_color[1],
              b: item.outline_color[2],
            };

            colorTile = {
              ...colorTile,
              border: `2px solid rgb(${outline_rgb.r}, ${outline_rgb.g}, ${outline_rgb.b})`,
            };
          }

          return (
            <div key={index}>
              <div className="title">
                <span className="color-tile" style={colorTile}></span>
                <span>{titles[index]}</span>
              </div>
              <button
                className="layer-trigger"
                onClick={() => toggleLayer(layerName)}
              >
                {item.visible ? "Disable" : "Enable"}
              </button>
              {item.color ? (
                <button
                  className="color-trigger"
                  onClick={() => showColorPicker(layerName, "fill")}
                >
                  Change fill color
                </button>
              ) : (
                ""
              )}
              {"outline_color" in item ? (
                <button
                  className="color-trigger"
                  onClick={() => showColorPicker(layerName, "outline")}
                >
                  Change outline color
                </button>
              ) : (
                ""
              )}
              <div
                className={`color-picker ${
                  activePicker === layerName ? "active" : ""
                }`}
                onMouseLeave={() => setActivePicker("")}
              >
                <SketchPicker
                  color={colorType === "fill" ? rgb : outline_rgb}
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
