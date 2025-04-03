
import { useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { RouteData, MapTileOption } from '@/types/RouteTypes';
import { Flag } from 'lucide-react';

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

// Create custom icons for start and end locations
const StartIcon = L.divIcon({
  className: 'custom-icon',
  html: `
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 border-2 border-white shadow-lg">
      <div class="w-4 h-4 bg-white rounded-full"></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const EndIcon = L.divIcon({
  className: 'custom-icon',
  html: `
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 border-2 border-white shadow-lg">
      <div class="w-4 h-4 bg-white rounded-full"></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Define the start and end locations
const startLocation = {
  name: "Rotterdam, Netherlands",
  position: [51.90, 4.10] as L.LatLngExpression,
  icon: StartIcon
};

const endLocation = {
  name: "Sheet Harbour, Canada",
  position: [44.90, -62.50] as L.LatLngExpression,
  icon: EndIcon
};

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
      opacity: 1,
      dashArray: route.dashStyle
    };
  };

  return (
    <div className="h-full w-full absolute inset-0 z-0">
      <MapContainer 
        center={[45, -30] as L.LatLngExpression} 
        zoom={3}
        zoomControl={false}
        className="h-full w-full"
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
        <Marker 
          position={startLocation.position} 
          icon={startLocation.icon as L.DivIcon}
        >
          <Popup>
            <div className="text-center">
              <strong>{startLocation.name}</strong>
              <p className="text-blue-600 font-medium">Starting Point</p>
            </div>
          </Popup>
        </Marker>
        
        <Marker 
          position={endLocation.position} 
          icon={endLocation.icon as L.DivIcon}
        >
          <Popup>
            <div className="text-center">
              <strong>{endLocation.name}</strong>
              <p className="text-red-600 font-medium">Destination</p>
            </div>
          </Popup>
        </Marker>

        {/* Move zoom controls to the top right */}
        <ZoomControl position="topright" />
      </MapContainer>
    </div>
  );
};

export default MapViewer;
