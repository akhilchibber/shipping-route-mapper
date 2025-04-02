
import { useState } from 'react';
import MapViewer from '@/components/MapViewer';
import ControlPanel from '@/components/ControlPanel';
import { initialRoutesState } from '@/data/routeData';
import { RouteData } from '@/types/RouteTypes';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [routes, setRoutes] = useState<RouteData[]>(initialRoutesState);
  const { toast } = useToast();

  const handleRouteChange = (routeId: string, changes: Partial<RouteData>) => {
    const updatedRoutes = routes.map(route => {
      if (route.id === routeId) {
        const updatedRoute = { ...route, ...changes };
        
        // Show notification for visibility changes
        if (changes.isVisible !== undefined) {
          toast({
            title: `${route.name} ${changes.isVisible ? 'Visible' : 'Hidden'}`,
            duration: 2000,
          });
        }
        
        return updatedRoute;
      }
      return route;
    });
    
    setRoutes(updatedRoutes);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <MapViewer routes={routes} />
      <ControlPanel routes={routes} onRouteChange={handleRouteChange} />
    </div>
  );
};

export default Index;
