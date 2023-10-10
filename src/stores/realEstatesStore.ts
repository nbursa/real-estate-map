import { defineStore } from 'pinia';
import type { Property } from '../types';
import { LatLngBounds, type LatLngExpression, type LatLngTuple, type PointExpression } from 'leaflet';
import axios from 'axios';
import { nextTick } from 'vue';

export const useRealEstatesStore = defineStore('realEstates', {
  state: () => ({
    zoom: 14,
    center: [47.3769, 8.5417] as PointExpression,
    properties: [] as Property[],
    viewBounds: undefined as LatLngBounds | undefined,
    dataLoaded: false,
    selectedProperty: null as Property | null,
  }),
  actions: {
    async fetchData() {
      try {
        const URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(URL);
        this.properties = response.data.publications.map((property: any) => {
          const coordinates: LatLngExpression = [
            property.address.coordinates.latitude,
            property.address.coordinates.longitude,
          ];
          return {
            id: property.id,
            coordinates,
            description: property.description,
            price: property.price,
            title: property.publicationTitle,
            pictures: property.pictures.map((picture: any) => picture.Url),
          };
        });

        const coordinatesArray = this.properties.map(property => property.coordinates as LatLngTuple);
        const bounds = new LatLngBounds(coordinatesArray);
    
        await nextTick();
    
        this.properties.forEach((property) => {
          bounds.extend(property.coordinates);
        });

        this.center = bounds.getCenter() as unknown as PointExpression;
        this.viewBounds = bounds;

        this.dataLoaded = true;
      } catch (error) {
        console.error('Error fetching real estate data:', error);
      }
    },

    truncateDescription(text: string): string {
      const maxCharacters = 200;
      if (text.length <= maxCharacters) {
        return text;
      }
      return text.substring(0, maxCharacters) + '...';
    },

    openMarkerPopup(property: Property) {
      this.selectedProperty = property;
    },

  },
});

