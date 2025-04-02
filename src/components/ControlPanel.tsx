
import { useState } from 'react';
import { RouteData } from '@/types/RouteTypes';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface ControlPanelProps {
  routes: RouteData[];
  onRouteChange: (routeId: string, changes: Partial<RouteData>) => void;
}

const ControlPanel = ({ routes, onRouteChange }: ControlPanelProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`fixed top-0 left-0 z-10 h-screen bg-sidebar transition-all duration-300 ease-in-out 
                    ${collapsed ? 'w-12' : 'w-80'} shadow-lg border-r border-sidebar-border`}>
      <div className="flex flex-col h-full p-4">
        <div className="flex justify-between items-center mb-6">
          {!collapsed && (
            <h1 className="text-xl font-bold text-sidebar-foreground">Route Settings</h1>
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
          <div className="space-y-6 overflow-auto flex-grow">
            {routes.map((route) => (
              <div key={route.id} className="space-y-3 pb-4 border-b border-sidebar-border">
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
                    {route.name}
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
