
import { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { RouteData } from '@/types/RouteTypes';

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

interface MapViewerProps {
  routes: RouteData[];
}

const MapViewer = ({ routes }: MapViewerProps) => {
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
        center={[45, -30]} 
        zoom={3} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {routes.filter(route => route.isVisible).map((route) => (
          <GeoJSON 
            key={route.id} 
            data={route.geojsonData} 
            pathOptions={routeStyle(route)}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapViewer;
