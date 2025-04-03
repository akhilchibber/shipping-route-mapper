
import { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { RouteData, MapTileOption, GridData } from '@/types/RouteTypes';
import { Flag } from 'lucide-react';
import { MapLegend } from '@/components/MapLegend';

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
  grids?: GridData;
  selectedMapTile: MapTileOption;
  activeGrids?: boolean;
  gridStyle?: {
    color: string;
    weight: number;
    opacity: number;
    fill: boolean;
    fillColor: string;
    fillOpacity: number;
    showLabels: boolean;
  };
}

const MapViewer = ({ 
  routes, 
  grids, 
  selectedMapTile, 
  activeGrids = false,
  gridStyle = { 
    color: '#3388ff', 
    weight: 2, 
    opacity: 1, 
    fill: false, 
    fillColor: '#3388ff', 
    fillOpacity: 0.2,
    showLabels: false
  } 
}: MapViewerProps) => {
  const mapRef = useRef<L.Map | null>(null);
  
  // Function to style routes based on their properties
  const routeStyle = (route: RouteData) => {
    return {
      color: route.color,
      weight: route.weight,
      opacity: 1,
      dashArray: route.dashStyle
    };
  };
  
  // Function to style grids
  const gridStyleFunction = () => {
    return {
      color: gridStyle.color,
      weight: gridStyle.weight,
      opacity: gridStyle.opacity,
      fill: gridStyle.fill,
      fillColor: gridStyle.fillColor,
      fillOpacity: gridStyle.fillOpacity
    };
  };

  // Center map on routes when component mounts
  useEffect(() => {
    if (mapRef.current) {
      // Calculate bounds of all routes
      const bounds = L.latLngBounds([]);
      
      // Add start and end points to bounds
      bounds.extend(startLocation.position);
      bounds.extend(endLocation.position);
      
      // Add route points to bounds
      routes.forEach(route => {
        if (route.isVisible && route.geojsonData.type === 'FeatureCollection') {
          route.geojsonData.features.forEach(feature => {
            if (feature.geometry.type === 'LineString') {
              feature.geometry.coordinates.forEach(coord => {
                bounds.extend([coord[1], coord[0]] as L.LatLngExpression);
              });
            }
          });
        }
      });
      
      // Fit map to bounds with padding
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, []);
  
  // Function to render grid labels if enabled
  const onEachGridFeature = (feature: any, layer: L.Layer) => {
    if (gridStyle.showLabels && feature.properties) {
      const centerLon = feature.properties.center_lon;
      const centerLat = feature.properties.center_lat;
      
      layer.bindTooltip(`${centerLon.toFixed(1)}, ${centerLat.toFixed(1)}`, {
        permanent: true,
        direction: 'center',
        className: 'grid-label'
      });
    }
  };

  return (
    <div className="h-full w-full absolute inset-0 z-0">
      <MapContainer 
        ref={mapRef}
        center={[45, -30]} 
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
        
        {activeGrids && grids && (
          <GeoJSON 
            data={grids}
            style={gridStyleFunction}
            onEachFeature={onEachGridFeature}
          />
        )}

        {/* Add markers for start and end locations */}
        <Marker 
          position={startLocation.position}
          icon={StartIcon}
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
          icon={EndIcon}
        >
          <Popup>
            <div className="text-center">
              <strong>{endLocation.name}</strong>
              <p className="text-red-600 font-medium">Destination</p>
            </div>
          </Popup>
        </Marker>

        {/* Add legend to the map */}
        <MapLegend routes={routes} />

        {/* Move zoom controls to the top right */}
        <ZoomControl position="topright" />
      </MapContainer>
    </div>
  );
};

export default MapViewer;
