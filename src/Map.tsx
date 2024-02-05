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
  apiBaseUrl: "https://gcp-us-east1.api.carto.com",
});

const INITIAL_VIEW_STATE = {
  longitude: -97.5,
  latitude: 35.5,
  zoom: 4,
  pitch: 0,
  bearing: 0,
};

function Map() {
  const layer = new CartoLayer({
    type: MAP_TYPES.QUERY,
    connection: "bigquery",
    data: "SELECT * FROM carto-demo-data.demo_tables.world_airports",
    pointRadiusMinPixels: 2,
    getLineColor: [0, 0, 0, 200],
    getFillColor: [238, 77, 90],
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
          layers={[layer]}
        >
          <StaticMap mapStyle={BASEMAP.POSITRON} />
        </DeckGL>
      </div>
    </>
  );
}

export default Map;
