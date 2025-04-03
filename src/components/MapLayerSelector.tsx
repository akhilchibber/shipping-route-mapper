
import { useState } from 'react';
import { mapTileOptions } from '@/data/routeData';
import { MapTileOption } from '@/types/RouteTypes';
import { Layers } from 'lucide-react';

interface MapLayerSelectorProps {
  selectedMapTile: MapTileOption;
  onMapTileChange: (mapTileId: string) => void;
}

const MapLayerSelector = ({ selectedMapTile, onMapTileChange }: MapLayerSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-16 right-4 z-40">
      <div className="relative">
        {/* Map Layer Toggle Button */}
        <button 
          className="bg-white p-2 rounded-md shadow-md flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Layers className="h-6 w-6" />
        </button>

        {/* Layer Selection Panel */}
        {isOpen && (
          <div className="absolute bottom-full right-0 mb-2 bg-white rounded-md shadow-lg p-2 w-48 grid grid-cols-2 gap-2">
            {mapTileOptions.map((tile) => (
              <button
                key={tile.id}
                className={`overflow-hidden rounded-sm border-2 ${selectedMapTile.id === tile.id ? 'border-primary' : 'border-transparent'} transition-all focus:outline-none focus:ring-2 focus:ring-primary`}
                onClick={() => {
                  onMapTileChange(tile.id);
                  setIsOpen(false);
                }}
              >
                <div className="relative h-12 w-full bg-gray-100">
                  {tile.thumbnail && (
                    <div 
                      className="absolute inset-0 bg-center bg-no-repeat bg-cover" 
                      style={{ backgroundImage: `url(${tile.thumbnail.replace('{s}', 'a')})` }}
                    />
                  )}
                </div>
                <div className="text-xs p-1 text-center truncate">{tile.name}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapLayerSelector;
