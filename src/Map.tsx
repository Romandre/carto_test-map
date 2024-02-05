"use client";

import DeckGL from "@deck.gl/react/typed";
import StaticMap from "react-map-gl";
import {
  BASEMAP,
  CartoLayer,
  setDefaultCredentials,
  MAP_TYPES,
} from "@deck.gl/carto/typed";

import "./Map.css";

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

function Map() {
  const retailStoresLayer = new CartoLayer({
    id: "stores",
    type: MAP_TYPES.QUERY,
    connection: "carto_dw",
    data: "SELECT * FROM `carto-demo-data.demo_tables.retail_stores`",
    pointRadiusMinPixels: 3,
    getLineColor: [0, 0, 0, 200],
    getFillColor: [238, 77, 90],
    lineWidthMinPixels: 1,
  });

  const worldAirportsLayer = new CartoLayer({
    id: "airports",
    type: MAP_TYPES.QUERY,
    connection: "carto_dw",
    data: "SELECT * FROM `carto-demo-data.demo_tables.world_airports`",
    pointRadiusMinPixels: 2,
    getLineColor: [0, 0, 0, 200],
    getFillColor: [53, 94, 59],
    lineWidthMinPixels: 1,
  });

  const blockgroupLayer = new CartoLayer({
    id: "blockgroup",
    type: MAP_TYPES.QUERY,
    connection: "carto_dw",
    data: "SELECT * FROM `carto-demo-data.demo_tileset.sociodemographics_usa_blockgroup`",
    pointRadiusMinPixels: 2,
    getLineColor: [0, 0, 0, 200],
    getFillColor: [53, 94, 59],
    lineWidthMinPixels: 1,
  });

  return (
    <>
      <div className="toolbar">
        <span>Toolbar</span>
      </div>
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
