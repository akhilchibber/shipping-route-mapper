
import { useState, useEffect } from 'react';
import MapViewer from '@/components/MapViewer';
import ControlPanel from '@/components/ControlPanel';
import MapLayerSelector from '@/components/MapLayerSelector';
import { initialRoutesState, mapTileOptions } from '@/data/routeData';
import { RouteData, MapTileOption, GridStyle } from '@/types/RouteTypes';
import { useToast } from '@/components/ui/use-toast';
import { gwsGridData, initialGridStyle } from '@/data/gwsGrids';

const Index = () => {
  const [routes, setRoutes] = useState<RouteData[]>(initialRoutesState);
  const [selectedMapTile, setSelectedMapTile] = useState<MapTileOption>(mapTileOptions[1]); // CartoDB Positron is default
  const [showGrids, setShowGrids] = useState(false);
  const [gridStyle, setGridStyle] = useState<GridStyle>(initialGridStyle);
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
  
  const handleToggleGrids = (show: boolean) => {
    setShowGrids(show);
    toast({
      title: `GWS Grids ${show ? 'Visible' : 'Hidden'}`,
      duration: 2000,
    });
  };
  
  const handleGridStyleChange = (styleChanges: Partial<GridStyle>) => {
    setGridStyle(prev => ({
      ...prev,
      ...styleChanges
    }));
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <MapViewer 
        routes={routes} 
        selectedMapTile={selectedMapTile} 
        grids={gwsGridData} 
        activeGrids={showGrids} 
        gridStyle={gridStyle}
      />
      <ControlPanel 
        routes={routes} 
        onRouteChange={handleRouteChange} 
        mapTileOptions={mapTileOptions}
        selectedMapTile={selectedMapTile}
        onMapTileChange={handleMapTileChange}
        showGrids={showGrids}
        onToggleGrids={handleToggleGrids}
        gridStyle={gridStyle}
        onGridStyleChange={handleGridStyleChange}
      />
      <MapLayerSelector 
        selectedMapTile={selectedMapTile}
        onMapTileChange={handleMapTileChange}
      />
    </div>
  );
};

export default Index;
