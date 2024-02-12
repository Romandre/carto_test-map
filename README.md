# Simple React application with 3 layers from CARTO

A React + TypeScript application with a map and layers from CARTO.

App link: [carto-map-test-app](https://carto-map-test-app.netlify.app/)

For local use, clone the repo, go to cloned "carto_test-map" directory and run following:

```bash
npm install
npm run dev
```

## Documentation

The app is created using React Vite as a build tool, which proved its simplicity and stability in use. The app is hosted on Netlify, as it is a free source and has nice integration with GitHub for quick app deployment.

### How to use the app

The app consists of a map along with layers on top of it and a toolbar from where some layer settings can be changed.

**Base map**

The base map is loaded by `<StaticMap>` by `react-map-gl` package.

To use StaticMap without a Mapbox token, the older version of the package had to be used (`react-map-gl@5`).

**Layers**

3 layers from CARTO are used on the map: retail stores, world airports and USA sociodemographics.

To get layers data in the app, layers had to be added to the Carto Builder map and tables querying had to be performed. The connection parameter value for `CartoLayer` have been taken from the SQL Editor modal.

**Toolbar**

The toolbar provides some simple toggle buttons and inputs for the map layer properties:

- Toggling layer visibility by "enabling"/"disabling" the layer;
- Changing point/layer fill color;
- Changing outline color (only for retail stores and world airports);
- Changing point and outline radiuses (only for retail stores and world airports).

Layer settings are separated for each layer type under the title of particular layer and a tile color which indicates the color of point/layer used on the map. Changing the fill/otline color will reflect on both the tile and the point/layer on the map.

The layer property values are changed directly for the `CartoLayer` object initiation. This approach is chosen for its simplicity and it seems to work well enough for small apps without major performance impact. However, I believe there is a better solution available for handling layers property change.

**Data management**

As the application is quite small, the data is handled through the main `App.tsx` component passing the props down to the child components `Map.tsx` and `Toolbar.tsx`. For more complex applications, Context API and/or Redux are preferable for more flexible data handling between components.

---

## Task feedback

The task is very well designed allowing to dive into the actual CARTO tools and documentation and also to show my React and TypeScript knowledge. This was challenging enough and I find this type of tasks really great as it gives an idea of the essence of work and dynamics in CARTO. I see that there is still a lot of stuff to study from the `deck.gl` and Carto documentations, which will be definitely my first priority and responsibility in case if I'm going to become a part of the team.

### Things to improve

- Avoid layers reload on window resize
- Support better layers handling to be able to add more layers without changing much in the code
- Tune overall appearance for better user experience, especially for mobile/tablet view
