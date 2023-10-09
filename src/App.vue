<script setup lang="ts">
import OpenStreetMap from './components/OpenStreetMap.vue';
</script>

<template>
  <header class="absolute top-0 right-0 m-2 bg-white py-2 px-4 z-1001 rounded">
    <h1 class="text-2xl text-black">Real Estates Map</h1>
  </header>

  <main>
    <open-street-map></open-street-map>
  </main>
</template>

