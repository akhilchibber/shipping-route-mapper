
import { Feature, FeatureCollection } from "geojson";

export interface RouteData {
  id: string;
  name: string;
  geojsonData: Feature | FeatureCollection;
  isVisible: boolean;
  color: string;
  weight: number;
  dashStyle: string;
  routeType: 'planned' | 'alternative' | 'grid';
}

export interface MapTileOption {
  id: string;
  name: string;
  url: string;
  attribution: string;
  thumbnail?: string;
}

export type GridData = FeatureCollection;

export interface GridStyle {
  color: string;
  weight: number;
  opacity: number;
  fill: boolean;
  fillColor: string;
  fillOpacity: number;
  showLabels: boolean;
}
