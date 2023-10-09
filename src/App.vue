<script setup lang="ts">
import OpenStreetMap from './components/OpenStreetMap.vue';
</script>

<template>
  <header class="absolute top-0 right-0 m-2 text-black bg-white py-2 px-4 z-50 rounded" style="z-index: 1000;">
    <h1 class="text-2xl text-black">Real Estates Map</h1>
  </header>

  <main>
    <open-street-map></open-street-map>
  </main>
</template>

