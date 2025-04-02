
import { useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
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

// Define the start and end locations
const startLocation = {
  name: "Rotterdam, Netherlands",
  position: [51.90, 4.10],
  icon: DefaultIcon
};

const endLocation = {
  name: "Sheet Harbour, Canada",
  position: [44.90, -62.50],
  icon: DefaultIcon
};

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
    <div className="h-full w-full absolute inset-0 z-0">
      <MapContainer 
        className="h-full w-full"
        center={[45, -30] as L.LatLngExpression} 
        zoom={3}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution={selectedMapTile.attribution}
          url={selectedMapTile.url}
        />
        
        {routes.filter(route => route.isVisible).map((route) => (
          <GeoJSON 
            key={route.id} 
            data={route.geojsonData}
            pathOptions={routeStyle(route)}
          />
        ))}

        {/* Add markers for start and end locations */}
        <Marker position={startLocation.position as L.LatLngExpression}>
          <Popup>
            <div className="text-center">
              <strong>{startLocation.name}</strong>
              <p>Starting Point</p>
            </div>
          </Popup>
        </Marker>
        
        <Marker position={endLocation.position as L.LatLngExpression}>
          <Popup>
            <div className="text-center">
              <strong>{endLocation.name}</strong>
              <p>Destination</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapViewer;
