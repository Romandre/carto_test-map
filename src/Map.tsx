import DeckGL from "@deck.gl/react/typed";
import StaticMap from "react-map-gl";
import {
  BASEMAP,
  CartoLayer,
  setDefaultCredentials,
  MAP_TYPES,
} from "@deck.gl/carto/typed";

import { TLayers } from "./types/layers";

import "./Map.css";

//---------------------------------------------

setDefaultCredentials({
  accessToken:
    "eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfbnExaGw4czUiLCJqdGkiOiJiNjIxMjNlZiJ9.1whcmZMjThY5gV5aQUHJrievAGAp2RLGOLey1u9dy9g",
  apiBaseUrl: "https://gcp-europe-west1.api.carto.com",
});

const INITIAL_VIEW_STATE = {
  longitude: -98,
  latitude: 35.5,
  zoom: 4,
  pitch: 0,
  bearing: 0,
};

type Props = {
  layers: TLayers;
};

//---------------------------------------------

function Map({ layers }: Props) {
  const retailStoresLayer = new CartoLayer({
    id: "stores",
    type: MAP_TYPES.QUERY,
    connection: "carto_dw",
    data: "SELECT * FROM `carto-demo-data.demo_tables.retail_stores`",
    pointRadiusMinPixels: layers.stores.radius,
    getFillColor: layers.stores.color,
    getLineColor: layers.stores.outline_color,
    lineWidthMinPixels: layers.stores.outline,
    visible: layers.stores.visible,
  });

  const worldAirportsLayer = new CartoLayer({
    id: "airports",
    type: MAP_TYPES.QUERY,
    connection: "carto_dw",
    data: "SELECT * FROM `carto-demo-data.demo_tables.world_airports`",
    pointRadiusMinPixels: layers.airports.radius,
    getFillColor: layers.airports.color,
    getLineColor: layers.airports.outline_color,
    lineWidthMinPixels: layers.airports.outline,
    visible: layers.airports.visible,
  });

  const blockgroupLayer = new CartoLayer({
    id: "blockgroup",
    type: MAP_TYPES.TILESET,
    connection: "carto_dw",
    data: "`carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup`",
    getFillColor: layers.blockground.color,
    stroked: false,
    opacity: 0.5,
    visible: layers.blockground.visible,
  });

  return (
    <>
      <div className="map-wrapper">
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          layers={[retailStoresLayer, worldAirportsLayer, blockgroupLayer]}
        >
          <StaticMap mapStyle={BASEMAP.POSITRON} />
        </DeckGL>
      </div>
    </>
  );
}

export default Map;
