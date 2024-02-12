import { useCallback, useState } from "react";
import { SketchPicker } from "react-color";

import { TLayers } from "../types/layers";
import { ColorResult } from "react-color";

import "../styles/Toolbar.css";

//---------------------------------------------

const titles = ["Retail Stores", "World Airports", "USA Sociodemographics"];

type Props = {
  layers: TLayers;
  setLayers: React.Dispatch<React.SetStateAction<TLayers>>;
};

//---------------------------------------------

function Toolbar({ layers, setLayers }: Props) {
  const [activePicker, setActivePicker] = useState("");
  const [colorType, setColorType] = useState("fill");

  const toggleLayer = useCallback(
    (layer: string) => {
      const layerObject = {
        ...layers[layer as keyof TLayers],
        visible: !layers[layer as keyof TLayers].visible,
      };

      setLayers((prev) => ({
        ...prev,
        [layer]: layerObject,
      }));
    },
    [layers, setLayers]
  );

  const showColorPicker = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, layer: string) => {
      const type = (event.target as HTMLInputElement).id;
      console.log(activePicker, layer);
      if (activePicker === "" || activePicker !== layer || colorType !== type) {
        setActivePicker(layer);
        setColorType(type);
      } else {
        setActivePicker("");
      }
    },
    [activePicker, setActivePicker, colorType, setColorType]
  );

  const changeColor = useCallback(
    (color: ColorResult, layer: string) => {
      let layerObject = {};

      if (colorType === "fill") {
        layerObject = {
          ...layers[layer as keyof TLayers],
          color: [color.rgb.r, color.rgb.g, color.rgb.b],
        };
      } else {
        layerObject = {
          ...layers[layer as keyof TLayers],
          outline_color: [color.rgb.r, color.rgb.g, color.rgb.b],
        };
      }

      setLayers((prev) => ({
        ...prev,
        [layer]: layerObject,
      }));
    },
    [layers, setLayers, colorType]
  );

  const handleRadiusChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, layer: string) => {
      let layerObject = {};

      layerObject = {
        ...layers[layer as keyof TLayers],
        [event.target.id]: Number(event.target.value),
      };

      setLayers((prev) => ({
        ...prev,
        [layer]: layerObject,
      }));
    },
    [layers, setLayers]
  );

  return (
    <div className="toolbar">
      <div className="layers">
        {Object.values(layers).map((layer, index) => {
          const layerName = Object.keys(layers)[index];
          const rgb = {
            r: layer.color[0],
            g: layer.color[1],
            b: layer.color[2],
          };
          let colorTile = {
            background: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
            border: "",
          };
          let outline_rgb = rgb;

          if ("outline_color" in layer) {
            outline_rgb = {
              r: layer.outline_color[0],
              g: layer.outline_color[1],
              b: layer.outline_color[2],
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
                {layer.visible ? "Disable" : "Enable"}
              </button>
              <div className="triggers-wrapper">
                {layer.color ? (
                  <button
                    id="fill"
                    className="color-trigger"
                    onClick={(event) => showColorPicker(event, layerName)}
                  >
                    Change fill color
                  </button>
                ) : (
                  ""
                )}
                {"outline_color" in layer ? (
                  <button
                    id="outline"
                    className="color-trigger"
                    onClick={(event) => showColorPicker(event, layerName)}
                  >
                    Change outline color
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="triggers-wrapper">
                {"radius" in layer ? (
                  <div className="radius-trigger">
                    <div>Point radius</div>
                    <input
                      id="radius"
                      type="number"
                      value={layer.radius}
                      min="1"
                      max="50"
                      onChange={(event) => handleRadiusChange(event, layerName)}
                    />
                  </div>
                ) : (
                  ""
                )}
                {"outline" in layer ? (
                  <div className="radius-trigger">
                    <div>Outline radius</div>
                    <input
                      id="outline"
                      type="number"
                      value={layer.outline}
                      min="0"
                      max="50"
                      onChange={(event) => handleRadiusChange(event, layerName)}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
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
