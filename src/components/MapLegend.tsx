
import { useState } from 'react';
import { RouteData } from '@/types/RouteTypes';
import { useMap } from 'react-leaflet';

interface MapLegendProps {
  routes: RouteData[];
}

export const MapLegend = ({ routes }: MapLegendProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <div className="leaflet-bottom leaflet-left z-[1000]">
      <div className="leaflet-control leaflet-bar bg-white shadow-lg rounded-md overflow-hidden">
        <div 
          className="p-2 font-medium text-sm bg-gray-100 flex justify-between items-center cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <span>Legend</span>
          <span>{isCollapsed ? '▼' : '▲'}</span>
        </div>
        
        {!isCollapsed && (
          <div className="p-3 space-y-3">
            <div>
              <h4 className="text-xs font-semibold mb-1">Locations</h4>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-600 border border-white">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-xs">Rotterdam (Start)</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center justify-center w-4 h-4 rounded-full bg-red-600 border border-white">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-xs">Sheet Harbour (End)</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-xs font-semibold mb-1">Routes</h4>
              <div className="space-y-1">
                {routes.filter(route => route.isVisible).map((route) => (
                  <div key={route.id} className="flex items-center space-x-2">
                    <div 
                      className="w-6 h-1 rounded-full" 
                      style={{ 
                        backgroundColor: route.color,
                        borderStyle: route.dashStyle ? 'dashed' : 'solid',
                        borderWidth: '1px',
                        borderColor: route.color
                      }}
                    ></div>
                    <span className="text-xs overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[120px]">
                      {route.id === 'moreDirectAzores' ? 'More Direct Aggre Route' : route.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
