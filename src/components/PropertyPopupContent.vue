<template>
    <property-carousel :property="props.property" :key="props.property.id"
        v-if="selectedProperty && props.property.id === selectedProperty.id" />

    <h2 class="text-xl font-bold mt-2">
        {{ props.property.title }}
    </h2>
    <p class="mt-0 cursor-pointer" @click="toggleDescription">
        {{ descriptionDisplay }}
    </p>
    <h3 class="text-base font-bold">
        Price: {{ props.property.price }} CHF
    </h3>
</template>
  
<script setup lang="ts">
import { useRealEstatesStore } from '@/stores/realEstatesStore';
import PropertyCarousel from './PropertyCarousel.vue';
import { computed, ref } from 'vue';

const store = useRealEstatesStore();
const props = defineProps(['property']);
const selectedProperty = computed(() => store.selectedProperty);

console.log('Selected Property ID:', selectedProperty.value?.id);
console.log('Current Property ID:', props.property.id);

const isFullDescription = ref(false);

const descriptionDisplay = computed(() => {
    return isFullDescription.value
        ? props.property.description
        : store.truncateDescription(props.property.description);
});

const toggleDescription = () => {
    isFullDescription.value = !isFullDescription.value;
};
</script>
  