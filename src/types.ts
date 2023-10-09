import { type LatLngExpression } from 'leaflet';

export interface Property {
  id: string;
  coordinates: LatLngExpression;
  title: string;
  description: string;
  price: number;
  pictures: string[];
}