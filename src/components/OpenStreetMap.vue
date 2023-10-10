<template>
  <div class="absolute top-0 left-0 right-0 bottom-0">
    <l-map ref="mapInstance" :zoom="store.zoom" :center="store.center" :use-global-leaflet="false">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
        name="OpenStreetMap"></l-tile-layer>
      <l-marker v-for="property in store.properties" :key="property.id" :lat-lng="property.coordinates"
        v-if="store.dataLoaded" @click="openMarkerPopup(property)">
        <l-icon :icon-size="[0, 0]" :icon-anchor="[0, 0]">
          <div
            class="text-black font-bold bg-white rounded inline-block w-auto px-2 py-1 whitespace-nowrap hover:text-white hover:bg-black">
            {{ property.price.toString() }} <span>CHF</span>
          </div>
        </l-icon>
        <l-tooltip>
          Click to view property details
        </l-tooltip>
        <l-popup>
          <property-popup-content :property="property" />
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";

import { useRealEstatesStore } from '../stores/realEstatesStore';
import { LMap, LTileLayer, LMarker, LTooltip, LPopup, LIcon } from "@vue-leaflet/vue-leaflet";
import { ref, onMounted, watch, nextTick } from 'vue';
import PropertyPopupContent from './PropertyPopupContent.vue';
import L from "leaflet";

const store = useRealEstatesStore();

const mapInstance = ref<typeof LMap | undefined>(undefined);

const calculateZoom = () => {
  const markers = store.properties.map((property) => property.coordinates);
  const map = mapInstance.value;

  if (markers.length > 0 && map) {
    const bounds = new L.LatLngBounds([]);

    markers.forEach((coords) => {
      bounds.extend(coords);
    });

    const newBounds = [
      [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
      [bounds.getNorthEast().lat, bounds.getNorthEast().lng]
    ];

    nextTick(() => {
      mapInstance.value?.leafletObject?.fitBounds(newBounds, { padding: [100, 100] });
    })
  }
};

const openMarkerPopup = (property: any) => {
  store.selectedProperty = property;
};

onMounted(async () => {
  if (!store.dataLoaded) {
    await store.fetchData();

    mapInstance.value?.$mapObject?.on('load', () => {
      nextTick(() => {
        calculateZoom()
      })
    });
  }
});

watch(() => store.dataLoaded, (loaded) => {
  if (loaded) {
    nextTick(() => {
      calculateZoom()
    })
  }
}, { immediate: true });
</script>

