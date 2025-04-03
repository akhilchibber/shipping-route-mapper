
import { useState } from 'react';
import { RouteData, MapTileOption } from '@/types/RouteTypes';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { dashStyles } from '@/data/routeData';

interface ControlPanelProps {
  routes: RouteData[];
  onRouteChange: (routeId: string, changes: Partial<RouteData>) => void;
  mapTileOptions: MapTileOption[];
  selectedMapTile: MapTileOption;
  onMapTileChange: (mapTileId: string) => void;
}

const ControlPanel = ({ 
  routes, 
  onRouteChange, 
  mapTileOptions,
  selectedMapTile,
  onMapTileChange
}: ControlPanelProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Filter routes by type
  const plannedRoutes = routes.filter(route => route.routeType === 'planned');
  const alternativeRoutes = routes.filter(route => route.routeType === 'alternative');

  return (
    <div className={`fixed top-0 left-0 z-50 h-screen bg-sidebar transition-all duration-300 ease-in-out 
                    ${collapsed ? 'w-12' : 'w-80'} shadow-lg border-r border-sidebar-border`}>
      <div className="flex flex-col h-full p-4">
        <div className="flex justify-between items-center mb-6">
          {!collapsed && (
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/0188a53c-4729-49f1-8898-68eb1fc79cd3.png" 
                alt="Boskalis Logo" 
                className="h-8 mr-2" 
              />
              <h1 className="text-xl font-bold text-sidebar-foreground">Route Overview</h1>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-auto" 
            onClick={toggleCollapse}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>

        {!collapsed && (
          <Tabs defaultValue="planned" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="planned">Planned Routes</TabsTrigger>
              <TabsTrigger value="alternative">Alternative Routes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="planned" className="space-y-6 overflow-auto max-h-[calc(100vh-160px)]">
              {plannedRoutes.map((route) => (
                <RouteCard key={route.id} route={route} onRouteChange={onRouteChange} />
              ))}
            </TabsContent>
            
            <TabsContent value="alternative" className="space-y-6 overflow-auto max-h-[calc(100vh-160px)]">
              {alternativeRoutes.map((route) => (
                <RouteCard key={route.id} route={route} onRouteChange={onRouteChange} />
              ))}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

interface RouteCardProps {
  route: RouteData;
  onRouteChange: (routeId: string, changes: Partial<RouteData>) => void;
}

const RouteCard = ({ route, onRouteChange }: RouteCardProps) => {
  return (
    <div className="space-y-3 pb-4 border-b border-sidebar-border">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id={`visibility-${route.id}`}
          checked={route.isVisible}
          onCheckedChange={(checked) => 
            onRouteChange(route.id, { isVisible: !!checked })
          }
        />
        <label 
          htmlFor={`visibility-${route.id}`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {route.id === 'moreDirectAzores' ? 'More Direct Aggre Route' : route.name}
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Color</label>
        <div className="flex items-center space-x-2">
          <Input
            type="color"
            value={route.color}
            onChange={(e) => onRouteChange(route.id, { color: e.target.value })}
            className="w-12 h-8 p-1"
          />
          <Input
            type="text"
            value={route.color}
            onChange={(e) => onRouteChange(route.id, { color: e.target.value })}
            className="w-24 h-8"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="text-xs text-muted-foreground">Line Width</label>
          <span className="text-xs text-muted-foreground">{route.weight}px</span>
        </div>
        <Slider 
          value={[route.weight]} 
          min={1} 
          max={10} 
          step={1}
          onValueChange={(value) => onRouteChange(route.id, { weight: value[0] })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Line Style</label>
        <Select
          value={dashStyles.find(ds => ds.pattern === route.dashStyle)?.id || 'solid'}
          onValueChange={(value) => {
            const dashStyle = dashStyles.find(ds => ds.id === value)?.pattern || '';
            onRouteChange(route.id, { dashStyle });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select line style" />
          </SelectTrigger>
          <SelectContent>
            {dashStyles.map((style) => (
              <SelectItem key={style.id} value={style.id}>
                {style.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ControlPanel;
