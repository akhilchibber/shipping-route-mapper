
import { useState } from 'react';
import MapViewer from '@/components/MapViewer';
import ControlPanel from '@/components/ControlPanel';
import MapLayerSelector from '@/components/MapLayerSelector';
import { initialRoutesState, mapTileOptions } from '@/data/routeData';
import { RouteData, MapTileOption } from '@/types/RouteTypes';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [routes, setRoutes] = useState<RouteData[]>(initialRoutesState);
  const [selectedMapTile, setSelectedMapTile] = useState<MapTileOption>(mapTileOptions[0]);
  const { toast } = useToast();

  const handleRouteChange = (routeId: string, changes: Partial<RouteData>) => {
    const updatedRoutes = routes.map(route => {
      if (route.id === routeId) {
        const updatedRoute = { ...route, ...changes };
        
        // Show notification for visibility changes
        if (changes.isVisible !== undefined) {
          toast({
            title: `${route.id === 'moreDirectAzores' ? 'More Direct Aggre Route' : route.name} ${changes.isVisible ? 'Visible' : 'Hidden'}`,
            duration: 2000,
          });
        }
        
        return updatedRoute;
      }
      return route;
    });
    
    setRoutes(updatedRoutes);
  };

  const handleMapTileChange = (mapTileId: string) => {
    const newMapTile = mapTileOptions.find(tile => tile.id === mapTileId);
    if (newMapTile) {
      setSelectedMapTile(newMapTile);
      toast({
        title: `Map changed to ${newMapTile.name}`,
        duration: 2000,
      });
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <MapViewer routes={routes} selectedMapTile={selectedMapTile} />
      <ControlPanel 
        routes={routes} 
        onRouteChange={handleRouteChange} 
        mapTileOptions={mapTileOptions}
        selectedMapTile={selectedMapTile}
        onMapTileChange={handleMapTileChange}
      />
      <MapLayerSelector 
        selectedMapTile={selectedMapTile}
        onMapTileChange={handleMapTileChange}
      />
    </div>
  );
};

export default Index;
