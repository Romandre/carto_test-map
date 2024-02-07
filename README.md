# carto_test-map

A React + TS application with a map and layers from CARTO

App link: https://carto-map-test-app.netlify.app/

## Documentation

The app is created using React Vite as a build tool that prooved it's simplicity and stability in use.
The app is hosted on Netlify as it is a free source and have nice integration with GitHub for quick apps deploy.

### How to use the app

The app consists of the map along with layers on top of it and a toolbar from where some layer settings can be changed.

#### Base map

In order to use StaticMap by react-map-gl package without a Mapbox token, the older version of the package had to be used (react-map-gl@5)

#### Layers

In order to get layers data in the app layers had to be added to the Carto Builder map and tables querying had to performed. The connection parameter value for CartoLayer have been taken from the SQL Editor modal.

#### Toolbar

Toolbar presents some simple toggles for the map layer properties:

- Toggling layer visibility by "enabilng"/"disabling" the layer;
- Chnaging point fill and outline colors;
- Changing point and outline radiuses.

The property values are changed directly for the CartoLayer object initiation.

#### Data management

As the application is quite small, the data is handled through the main App.tsx component passing the props down to the child components Map.tsx and Toolbar.tsx. For more complex applications Context API and/or Redux is preferable for more flexible data handling between components.

---

## Task feedback

The task is very well designed allowing to dive into the actual CARTO tools and documentation and also to show my React and Typescript knowledge. This was challenging enough and I find this type of tasks really great as it gives an idea of an esence of work and dynamics in CARTO. I see that there is still a lot of stuff to study from the deck.gl and Carto documentations, which will be definitelly my first priority and responsibility in case if I'm going to become a part of the team.
