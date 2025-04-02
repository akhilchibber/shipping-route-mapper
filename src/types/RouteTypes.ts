
import { Feature, FeatureCollection } from "geojson";

export interface RouteData {
  id: string;
  name: string;
  geojsonData: Feature | FeatureCollection;
  isVisible: boolean;
  color: string;
  weight: number;
}

export interface MapTileOption {
  id: string;
  name: string;
  url: string;
  attribution: string;
}
