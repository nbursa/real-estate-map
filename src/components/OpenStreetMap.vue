<template>
  <div class="absolute top-0 left-0 right-0 bottom-0">
    <l-map ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker
        v-for="property in properties"
        :key="property.id"
        :lat-lng="property.coordinates"
      >
        <l-popup>{{ property.description }}</l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { type LatLngExpression, type LatLngBoundsExpression, LatLngBounds, LatLng, type PointExpression, type LatLngTuple } from "leaflet";

interface Property {
  id: string;
  coordinates: LatLngExpression;
  description: string;
}

const zoom = ref<number>(16);
const center = ref<PointExpression>([47.3769, 8.5417]);
const properties = ref<Property[]>([]);
const viewBounds = ref<LatLngBounds | undefined>(undefined); 

const mapInstance = ref<typeof LMap | undefined>(undefined);

onMounted(async () => {
  try {
    const response = await axios.get('https://blattcodeservices.com/pct/search');
    console.log(response)
    properties.value = response.data.publications.map((property: any) => {
      const coordinates: LatLngExpression = [property.address.coordinates.latitude, property.address.coordinates.longitude]
      console.log('property coordinates: ', coordinates)
      return {
        id: property.id,
        coordinates,
        description: property.description,
      };
    });

    const coordinatesArray = properties.value.map(property => property.coordinates as LatLngTuple);
    const bounds = new LatLngBounds(coordinatesArray);
    properties.value.forEach((property) => {
      bounds.extend(property.coordinates);
    });

    center.value = bounds.getCenter() as unknown as PointExpression;
    viewBounds.value = bounds;
  } catch (error) {
    console.error('Error fetching real estate data:', error);
  }
});

watch(mapInstance, (newMap) => {
  if (newMap && viewBounds.value) {
    zoom.value = calculateZoomLevel(viewBounds.value, 0.8);
  }
});

const calculateZoomLevel = (bounds: LatLngBounds, padding: number): number => {
  let currentZoom: number = zoom.value;
  let viewBounds: LatLngBounds = bounds as LatLngBounds;

  while (currentZoom > 1 && viewBounds.getNorth() - bounds.getNorth() > padding) {
    currentZoom--;
    viewBounds = bounds.pad(-0.5 * currentZoom);
  }

  return currentZoom;
}
</script>
