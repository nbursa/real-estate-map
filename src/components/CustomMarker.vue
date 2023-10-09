<template>
    <div class="custom-marker">
      <div class="price">{{ props.price }} CHF</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps } from 'vue';
  
  const props = defineProps({
    price: Number,
  });
  </script>
  
  <style scoped>
.custom-marker {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-background);
  color: var(--color-text);
  border: 2px solid var(--color-background);
  border-radius: 20px;
  text-align: center;
  padding: 0 5px;
  cursor: pointer;
  z-index: 1000;
}
  
  .price {
    font-weight: bold;
  }
  
  .property-info {
    font-size: 12px;
  }
  </style>
  