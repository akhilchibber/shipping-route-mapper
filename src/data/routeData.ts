
// GeoJSON data for shipping routes
export const directRouteGeoJSON = {
  "type": "Feature",
  "properties": {
    "name": "Direct Route",
    "description": "Direct route crossing the North Atlantic"
  },
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-4.142, 50.371], // Plymouth, UK
      [-71.05, 42.36]   // Boston, USA
    ]
  }
};

export const azoresRouteGeoJSON = {
  "type": "Feature",
  "properties": {
    "name": "Azores Route",
    "description": "Route passing through the Azores"
  },
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-4.142, 50.371],  // Plymouth, UK
      [-25.667, 37.741], // Azores
      [-71.05, 42.36]    // Boston, USA
    ]
  }
};

export const moreDirectAzoresRouteGeoJSON = {
  "type": "Feature",
  "properties": {
    "name": "More Direct Azores Route",
    "description": "More direct route near the Azores"
  },
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-4.142, 50.371],  // Plymouth, UK
      [-28.0, 39.0],     // North of Azores
      [-71.05, 42.36]    // Boston, USA
    ]
  }
};

export const canariesRouteGeoJSON = {
  "type": "Feature",
  "properties": {
    "name": "Canaries Route",
    "description": "Southern route via the Canary Islands"
  },
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-4.142, 50.371],   // Plymouth, UK
      [-15.4, 28.0],      // Canary Islands
      [-71.05, 42.36]     // Boston, USA
    ]
  }
};

export const initialRoutesState = [
  { 
    id: 'direct', 
    name: 'Direct Route', 
    geojsonData: directRouteGeoJSON, 
    isVisible: true, 
    color: '#F97316', 
    weight: 3 
  },
  { 
    id: 'azores', 
    name: 'Azores Route', 
    geojsonData: azoresRouteGeoJSON, 
    isVisible: true, 
    color: '#0EA5E9', 
    weight: 3 
  },
  { 
    id: 'moreDirectAzores', 
    name: 'More Direct Azores', 
    geojsonData: moreDirectAzoresRouteGeoJSON, 
    isVisible: true, 
    color: '#22C55E', 
    weight: 3 
  },
  { 
    id: 'canaries', 
    name: 'Canaries Route', 
    geojsonData: canariesRouteGeoJSON, 
    isVisible: true, 
    color: '#A855F7', 
    weight: 3 
  },
];
