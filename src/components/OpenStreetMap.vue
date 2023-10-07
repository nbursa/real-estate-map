<template>
  <div class="absolute top-0 left-0 right-0 bottom-0">
    <l-map ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { ref, onMounted } from 'vue';

const zoom = ref<number>(16);
const center = ref<[number, number]>([47.3769, 8.5417]);

onMounted(() => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      center.value = [latitude, longitude];
    });
  } else {
    console.log("Geolocation is not available in this browser.");
  }
});
</script>

<style></style>
