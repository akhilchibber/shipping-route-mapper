import { FeatureCollection } from "geojson";

// GeoJSON data for shipping routes
export const directRouteGeoJSON: FeatureCollection = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "voyageId": "V_DIRECT_001",
        "vesselId": "HTV_Triumph",
        "departurePort": "Rotterdam",
        "arrivalPort": "Sheet Harbour",
        "departureTimestamp": "2024-07-01T08:00:00Z",
        "arrivalTimestamp": "2024-07-12T14:00:00Z"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [4.10, 51.90],
          [-1.00, 50.50],
          [-8.50, 49.80],
          [-18.00, 49.50],
          [-28.00, 49.00],
          [-38.00, 48.50],
          [-48.00, 47.80],
          [-55.00, 47.00],
          [-60.00, 45.80],
          [-62.00, 45.10],
          [-62.50, 44.90]
        ]
      }
    }
  ]
};

export const azoresRouteGeoJSON: FeatureCollection = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "voyageId": "V_CANARIES_001",
        "vesselId": "HTV_Triumph",
        "departurePort": "Rotterdam",
        "arrivalPort": "Sheet Harbour",
        "departureTimestamp": "2024-08-01T08:00:00Z",
        "arrivalTimestamp": "2024-08-16T10:00:00Z"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [4.10, 51.90],
          [-2.00, 50.00],
          [-7.50, 46.50],
          [-11.00, 43.00],
          [-14.00, 38.50],
          [-18.00, 33.00],
          [-22.00, 28.50],
          [-32.00, 29.50],
          [-42.00, 32.00],
          [-52.00, 36.00],
          [-60.00, 40.50],
          [-62.80, 44.50],
          [-62.50, 44.90]
        ]
      }
    }
  ]
};

export const moreDirectAzoresRouteGeoJSON: FeatureCollection = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "voyageId": "V_AZORES_001",
        "vesselId": "HTV_Triumph",
        "departurePort": "Rotterdam",
        "arrivalPort": "Sheet Harbour",
        "departureTimestamp": "2024-07-15T08:00:00Z",
        "arrivalTimestamp": "2024-07-28T22:00:00Z"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [4.10, 51.90],
          [-1.50, 50.20],
          [-8.00, 47.50],
          [-15.00, 44.50],
          [-22.00, 40.50],
          [-29.00, 38.00],
          [-38.00, 38.50],
          [-47.00, 39.80],
          [-55.00, 41.50],
          [-60.00, 43.50],
          [-62.00, 44.70],
          [-62.50, 44.90]
        ]
      }
    }
  ]
};

export const canariesRouteGeoJSON: FeatureCollection = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "voyageId": "V_CANARIES_001",
        "vesselId": "HTV_Triumph",
        "departurePort": "Rotterdam",
        "arrivalPort": "Sheet Harbour",
        "departureTimestamp": "2024-09-01T08:00:00Z",
        "arrivalTimestamp": "2024-09-18T12:00:00Z"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [4.10, 51.90],
          [-1.80, 50.10],
          [-8.50, 47.00],
          [-11.00, 42.00],
          [-12.50, 37.00],
          [-16.00, 31.00],
          [-20.00, 29.00],
          [-30.00, 30.00],
          [-40.00, 31.50],
          [-50.00, 33.50],
          [-60.00, 37.00],
          [-64.00, 41.50],
          [-63.00, 44.00],
          [-62.50, 44.90]
        ]
      }
    }
  ]
};

// Available map tile options
export const mapTileOptions = [
  {
    id: 'osm',
    name: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    thumbnail: 'https://{s}.tile.openstreetmap.org/3/4/2.png'
  },
  {
    id: 'carto',
    name: 'CartoDB Positron',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    thumbnail: 'https://a.basemaps.cartocdn.com/light_all/3/4/2.png'
  },
  {
    id: 'satellite',
    name: 'ESRI World Imagery',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    thumbnail: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/3/2/4'
  },
  {
    id: 'dark',
    name: 'CartoDB Dark',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    thumbnail: 'https://a.basemaps.cartocdn.com/dark_all/3/4/2.png'
  }
];

// Dash styles for routes
export const dashStyles = [
  { id: 'solid', name: 'Solid', pattern: '' },
  { id: 'dashed', name: 'Dashed', pattern: '8, 8' },
  { id: 'dotted', name: 'Dotted', pattern: '2, 8' },
  { id: 'dashdot', name: 'Dash-Dot', pattern: '10, 5, 2, 5' }
];

export const initialRoutesState = [
  { 
    id: 'direct', 
    name: 'Direct Route', 
    geojsonData: directRouteGeoJSON, 
    isVisible: true, 
    color: '#FF0000', 
    weight: 3,
    dashStyle: '2, 8', // Set to dotted by default
    routeType: 'alternative'
  },
  { 
    id: 'azores', 
    name: 'Azores Route', 
    geojsonData: azoresRouteGeoJSON, 
    isVisible: true, 
    color: '#FF0000', 
    weight: 3,
    dashStyle: '2, 8', // Set to dotted by default
    routeType: 'alternative'
  },
  { 
    id: 'moreDirectAzores', 
    name: 'More Direct Aggre Route', 
    geojsonData: moreDirectAzoresRouteGeoJSON, 
    isVisible: true, 
    color: '#000000', 
    weight: 3,
    dashStyle: '2, 8', // Set to dotted by default
    routeType: 'planned'
  },
  { 
    id: 'canaries', 
    name: 'Canaries Route', 
    geojsonData: canariesRouteGeoJSON, 
    isVisible: true, 
    color: '#FF0000', 
    weight: 3,
    dashStyle: '2, 8', // Set to dotted by default
    routeType: 'alternative' 
  },
];
