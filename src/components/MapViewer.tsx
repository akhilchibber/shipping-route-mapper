
import { useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { RouteData, MapTileOption } from '@/types/RouteTypes';

// Fix Leaflet icon issue
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// This component handles the map tile change
function MapTileLayer({ selectedMapTile }: { selectedMapTile: MapTileOption }) {
  return (
    <TileLayer
      attribution={selectedMapTile.attribution}
      url={selectedMapTile.url}
    />
  );
}

interface MapViewerProps {
  routes: RouteData[];
  selectedMapTile: MapTileOption;
}

const MapViewer = ({ routes, selectedMapTile }: MapViewerProps) => {
  // Function to style routes based on their properties
  const routeStyle = (route: RouteData) => {
    return {
      color: route.color,
      weight: route.weight,
      opacity: 1
    };
  };

  return (
    <div className="h-screen w-full">
      <MapContainer 
        className="h-full w-full"
        zoom={3} 
        zoomControl={false}
        center={[45, -30] as L.LatLngExpression}
      >
        <MapTileLayer selectedMapTile={selectedMapTile} />
        
        {routes.filter(route => route.isVisible).map((route) => (
          <GeoJSON 
            key={route.id} 
            data={route.geojsonData} 
            style={() => routeStyle(route)}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapViewer;
