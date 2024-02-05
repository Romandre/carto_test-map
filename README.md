# carto_test-map

A React + TS application with a map from CARTO

The app was created using React Vite as I used it many times and it proved it's simplicity and stability in use.
The app is hosted on Netlify as it is a free source and have nice integration with GitHub for quick apps deploy.

App link: https://carto-map-test-app.netlify.app/

## Documentation

### Base map

In order to use StaticMap by react-map-gl package without a Mapbox token, the older version of the package had to be used (react-map-gl@5)

### Layers

In order to get layers data in the app layers had to be added to the Carto Builder map and tables querying had to performed. The connection parameter value for CartoLayer have been taken from the SQL Editor modal.
