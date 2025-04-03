
import { useState } from 'react';
import { RouteData, MapTileOption, GridStyle } from '@/types/RouteTypes';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { dashStyles } from '@/data/routeData';
import { initialGridStyle } from '@/data/gwsGrids';

interface ControlPanelProps {
  routes: RouteData[];
  onRouteChange: (routeId: string, changes: Partial<RouteData>) => void;
  mapTileOptions: MapTileOption[];
  selectedMapTile: MapTileOption;
  onMapTileChange: (mapTileId: string) => void;
  showGrids?: boolean;
  onToggleGrids?: (show: boolean) => void;
  gridStyle?: GridStyle;
  onGridStyleChange?: (style: Partial<GridStyle>) => void;
}

const ControlPanel = ({ 
  routes, 
  onRouteChange, 
  mapTileOptions,
  selectedMapTile,
  onMapTileChange,
  showGrids = false,
  onToggleGrids = () => {},
  gridStyle = initialGridStyle,
  onGridStyleChange = () => {}
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
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/120c325f-eeff-46c9-9061-516848f238ff.png" 
                alt="Boskalis Logo" 
                className="h-8" 
              />
              <h1 className="text-xl font-semibold text-primary">Route Overview</h1>
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="planned">Planned Routes</TabsTrigger>
              <TabsTrigger value="alternative">Alternative Routes</TabsTrigger>
              <TabsTrigger value="grids">GWS Grids</TabsTrigger>
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
            
            <TabsContent value="grids" className="space-y-6 overflow-auto max-h-[calc(100vh-160px)]">
              <div className="space-y-4 pb-4 border-b border-sidebar-border">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="grid-visibility"
                    checked={showGrids}
                    onCheckedChange={(checked) => onToggleGrids(!!checked)}
                  />
                  <label htmlFor="grid-visibility" className="text-sm font-medium">
                    Show GWS Grids
                  </label>
                </div>
                
                {showGrids && (
                  <>
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground">Border Color</label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="color"
                          value={gridStyle.color}
                          onChange={(e) => onGridStyleChange({ color: e.target.value })}
                          className="w-12 h-8 p-1"
                        />
                        <Input
                          type="text"
                          value={gridStyle.color}
                          onChange={(e) => onGridStyleChange({ color: e.target.value })}
                          className="w-24 h-8"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-xs text-muted-foreground">Border Width</label>
                        <span className="text-xs text-muted-foreground">{gridStyle.weight}px</span>
                      </div>
                      <Slider 
                        value={[gridStyle.weight]} 
                        min={1} 
                        max={5} 
                        step={0.5}
                        onValueChange={(value) => onGridStyleChange({ weight: value[0] })}
                      />
                    </div>
                    
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="grid-fill"
                          checked={gridStyle.fill}
                          onCheckedChange={(checked) => onGridStyleChange({ fill: !!checked })}
                        />
                        <label htmlFor="grid-fill" className="text-xs text-muted-foreground">
                          Fill Grid Cells
                        </label>
                      </div>
                      
                      {gridStyle.fill && (
                        <div className="pt-2 space-y-2">
                          <label className="text-xs text-muted-foreground">Fill Color</label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="color"
                              value={gridStyle.fillColor}
                              onChange={(e) => onGridStyleChange({ fillColor: e.target.value })}
                              className="w-12 h-8 p-1"
                            />
                            <Input
                              type="text"
                              value={gridStyle.fillColor}
                              onChange={(e) => onGridStyleChange({ fillColor: e.target.value })}
                              className="w-24 h-8"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <label className="text-xs text-muted-foreground">Fill Opacity</label>
                              <span className="text-xs text-muted-foreground">{gridStyle.fillOpacity.toFixed(1)}</span>
                            </div>
                            <Slider 
                              value={[gridStyle.fillOpacity * 10]} 
                              min={1} 
                              max={10} 
                              step={1}
                              onValueChange={(value) => onGridStyleChange({ fillOpacity: value[0] / 10 })}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="grid-labels"
                          checked={gridStyle.showLabels}
                          onCheckedChange={(checked) => onGridStyleChange({ showLabels: !!checked })}
                        />
                        <label htmlFor="grid-labels" className="text-xs text-muted-foreground">
                          Show Grid Labels
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </div>
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
