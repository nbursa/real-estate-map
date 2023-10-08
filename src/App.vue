<script setup lang="ts">
import OpenStreetMap from './components/OpenStreetMap.vue';
</script>

<template>
  <header class="absolute top-0 right-0 m-2 bg-white py-2 px-4 z-20 rounded">
    <h1 class="text-2xl text-black">Real Estates Map</h1>
  </header>

  <main class="absolute top-0 left-0 w-screen h-screen z-10">
    <open-street-map></open-street-map>
  </main>
</template>

