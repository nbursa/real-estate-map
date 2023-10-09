<template>
  <div class="absolute top-0 left-0 right-0 bottom-0">
    <l-map ref="map" :zoom="store.zoom" :center="store.center" :use-global-leaflet="false">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
        name="OpenStreetMap"></l-tile-layer>
      <l-marker v-for="property in store.properties" :key="property.id" :lat-lng="property.coordinates"
        v-if="store.dataLoaded" @click="openMarkerPopup(property)">
        <l-icon :icon-size="[0, 0]" :icon-anchor="[0, 0]">
          <div class="text-white font-bold bg-black rounded inline-block w-auto px-2 py-1 whitespace-nowrap">
            {{ property.price.toString() }} <span>CHF</span>
          </div>
        </l-icon>
        <l-tooltip>
          Click to view property details
        </l-tooltip>
        <l-popup>
          <property-popup-content :property="property" :key="property.id" />
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";

import { useRealEstatesStore } from '../stores/realEstatesStore';
import { LMap, LTileLayer, LMarker, LTooltip, LPopup, LIcon } from "@vue-leaflet/vue-leaflet";
import { ref, onMounted, watch } from 'vue';
import PropertyPopupContent from './PropertyPopupContent.vue';
// import { defineEmits } from 'vue';

// const emits = defineEmits();

const store = useRealEstatesStore();

const mapInstance = ref<typeof LMap | undefined>(undefined);

const zoom = ref<number>(16);

const calculateZoom = () => {
  const bounds = store.viewBounds;
  if (bounds && store.properties.length > 0) {
    const mapWidth = mapInstance.value?.$el.offsetWidth || 0;
    const mapHeight = mapInstance.value?.$el.offsetHeight || 0;

    if (mapWidth && mapHeight) {
      const zoomWidth = bounds.getEast() - bounds.getWest() === 0 ? 1 : mapWidth / (bounds.getEast() - bounds.getWest());
      const zoomHeight = bounds.getNorth() - bounds.getSouth() === 0 ? 1 : mapHeight / (bounds.getNorth() - bounds.getSouth());

      store.zoom = Math.min(zoomWidth, zoomHeight);
    }
  }
};

const openMarkerPopup = (property: any) => {
  store.selectedProperty = property;
  console.log("store.selectedProperty: ", store.selectedProperty);
  // emits('openPopup');
};

onMounted(async () => {
  if (!store.dataLoaded) {
    await store.fetchData();

    mapInstance.value?.$mapObject?.on('load', () => {
      calculateZoom();
    });
  }
});

watch(() => store.dataLoaded, (loaded) => {
  if (loaded) {
    calculateZoom();
  }
}, { immediate: true });

console.log('Setup function executed', zoom.value);
</script>

